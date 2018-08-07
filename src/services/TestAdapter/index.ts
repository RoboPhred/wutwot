import { Identifier } from "microinject";

import { TestAdapterImpl } from "./TestAdapterImpl";
export const TestAdapter: Identifier<TestAdapterImpl> = TestAdapterImpl;
export type TestAdapter = TestAdapterImpl;
