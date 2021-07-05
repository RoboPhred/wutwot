import { v4 as uuidV4 } from "uuid";
import {
  Container,
  Identifier,
  inject,
  injectable,
  injectParam,
  provides,
  ServiceLocator,
} from "microinject";
import { ThingsManager } from "../../things";
import { PluginThingFactory } from "../components";
import { WutWotPlugin } from "../contracts";
import { PluginBinder, PluginBinderParameters } from "../services";
import { PluginScope } from "../scopes";

@injectable()
@provides(PluginBinder)
export class PluginBinderImpl implements PluginBinder {
  private _initialized = false;
  private _serviceLocator: ServiceLocator | undefined;

  constructor(
    @injectParam(PluginBinderParameters.Plugin)
    private readonly _plugin: WutWotPlugin,
    @inject(Container) container: Container,
    @inject(ThingsManager) thingManager: ThingsManager,
    @inject(PluginThingFactory)
    pluginThingFactory: PluginThingFactory,
  ) {
    const pluginIdentifier = Symbol(
      `plugin::${uuidV4()}`,
    ) as Identifier<WutWotPlugin>;

    // Hack: We need the plugin to exist as a scope, so that we can provide the plugin's
    // services with the PluginThingsManager for this specific plugin.
    // However, we only ever want one instance of this specific plugin.
    // Additionally, we need to capture the plugin's factory context so that onPluginInitialize can
    // also get the PluginThingsManager.

    const binder = container
      .bind(pluginIdentifier)
      .toFactory((context) => {
        if (this._serviceLocator) {
          throw new Error("Plugin binding factory called more than once.");
        }
        this._serviceLocator = context;
        return _plugin;
      })
      .asScope(PluginScope);
    // TODO: Update microinject so we get the typings for this.
    (binder as any).inSingletonScope();

    // Re-get the plugin so that the factory function is called.
    // This should be the only time this plugin is ever fetched from the container.
    container.get(pluginIdentifier);

    if (!this._serviceLocator) {
      throw new Error(
        "Failed to initialize the plugin: Plugin binding factory not called.",
      );
    }

    if (_plugin.onRegisterServices) {
      const registry = _plugin.onRegisterServices(
        container.bind.bind(container),
      );
      if (registry) {
        container.load(registry);
      }
    }
  }

  onPluginInitialize() {
    if (this._initialized) {
      return;
    }
    this._initialized = true;

    if (this._plugin.onPluginInitialize) {
      this._plugin.onPluginInitialize(this._serviceLocator!);
    }
  }
}
