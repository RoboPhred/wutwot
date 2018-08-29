"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestPlugin {
    constructor() {
        this.id = "test-plugin";
    }
    onRegisterPlugin(plugin) {
        plugin.addThing({
            name: "test-thing-1",
            description: ""
        });
    }
}
exports.TestPlugin = TestPlugin;
//# sourceMappingURL=TestPlugin.js.map