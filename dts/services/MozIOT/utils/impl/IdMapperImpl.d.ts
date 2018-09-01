import { IdMapper } from "../IdMapper";
export declare class IdMapperImpl implements IdMapper {
    private _ids;
    private _nextRollingPostfix;
    createId(name: string): string;
    retireId(id: string): boolean;
    [Symbol.iterator](): IterableIterator<string>;
    has(id: string): boolean;
}
