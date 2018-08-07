export interface ThingDef {
    readonly id: string;
    readonly type: string;
    readonly defaultName?: string;
    readonly defaultDescription?: string;
}
export declare namespace ThingDef {
    function equals(a: ThingDef, b: ThingDef): boolean;
    function isSameType(a: ThingDef, b: ThingDef): boolean;
}
