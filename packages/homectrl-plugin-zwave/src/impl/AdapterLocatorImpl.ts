import { join } from "path";
import serialport, { PortInfo } from "serialport";
import { injectable, provides, inject } from "microinject";

import { ZWavePort } from "../config";

import { AdapterLocator } from "../components/AdapterLocator";

// TODO: Make configurable
const adapters = require(join(__dirname, "../../config/zwave-adapters.json"));

@injectable()
@provides(AdapterLocator)
export class AdapterLocatorImpl {
  constructor(
    @inject(ZWavePort, { optional: true }) private _port: string | undefined,
  ) {}

  async getAdapterPort(): Promise<string | null> {
    if (this._port) {
      return this._port;
    }
    const serialPorts = await serialport.list();
    return pickUsbSerialPort(serialPorts);
  }
}

function findSerialPortByIDs(
  ports: PortInfo[],
  vendor: number,
  product: number,
) {
  for (const port of ports) {
    // vendorId and productId are in hex but without the hex marker.
    const pVendor = parseInt("0x" + port.vendorId || "");
    const pProduct = parseInt("0x" + port.productId || "");
    if (isNaN(vendor) || isNaN(product)) {
      continue;
    }

    if (vendor == pVendor && product == pProduct) {
      return port;
    }
  }

  return null;
}

function pickUsbSerialPort(ports: PortInfo[]): string | null {
  const usbAdapters = adapters["usb-serial"];

  for (let i = 0; i < usbAdapters.length; i++) {
    const adapter = usbAdapters[i];

    const vendor = parseInt(adapter.usbVendor);
    const product = parseInt(adapter.usbProduct);
    if (isNaN(vendor) || isNaN(product)) {
      continue;
    }

    const port = findSerialPortByIDs(ports, vendor, product);
    if (port) {
      return `\\\\.\\${port.comName}`;
    }
  }

  return null;
}
