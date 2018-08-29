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
        }, {
            capabilityType: "action",
            label: "Test action",
            description: "This is a Test Action",
            input: { type: "null" },
            request(input) {
                console.log("Test action performed");
            }
        });
    }
}
exports.TestPlugin = TestPlugin;
//# sourceMappingURL=TestPlugin.js.map