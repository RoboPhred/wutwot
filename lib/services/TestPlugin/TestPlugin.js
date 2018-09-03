"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const action_requests_1 = require("../MozIot/action-requests");
class TestPlugin {
    constructor() {
        this.id = "test-plugin";
    }
    onRegisterPlugin(plugin) {
        plugin.addThing({
            name: "Test Thing 1",
            description: ""
        }, {
            capabilityType: "type",
            type: "TestThing"
        }, {
            capabilityType: "action",
            label: "Test action",
            description: "This is a Test Action",
            input: { type: "null" },
            request: (input, token) => __awaiter(this, void 0, void 0, function* () {
                console.log("Test action pending");
                yield wait(1000);
                token.setStatus(action_requests_1.ThingActionRequestStatus.Started);
                console.log("Test action started");
                yield wait(1000);
                token.setStatus(action_requests_1.ThingActionRequestStatus.Completed);
                console.log("Test action completed");
            })
        });
    }
}
exports.TestPlugin = TestPlugin;
function wait(delay) {
    return new Promise(accept => {
        setTimeout(accept, delay);
    });
}
//# sourceMappingURL=TestPlugin.js.map