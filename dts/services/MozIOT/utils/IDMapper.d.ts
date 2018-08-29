export declare class IdMapper {
    private _ids;
    private _nextRollingPostfix;
    createId(root: string): string;
    retireId(id: string): boolean;
    [Symbol.iterator](): IterableIterator<string>;
    has(id: string): boolean;
}
