import { v4 as uuidV4 } from "uuid";

import { mapToObject, objectToMap, keyForValue } from "../../utils/map";

import { Database, DataStorageKey } from "../persistence";

import { IdClaims } from "./types";

/**
 * Defines a component that can map claims to persistent IDs.
 */
export interface IdMapper {
  createId(claimedId: string | IdClaims): string;
  retireId(id: string): void;
}

export class IdMapperImpl {
  private _idsByClaim = new Map<string, string>();

  constructor(private _dataKey: DataStorageKey, private _database: Database) {
    this._loadIds();
  }

  createId(claimedId: string | IdClaims): string {
    const claim = flattenClaims(claimedId);

    let id = this._idsByClaim.get(claim);
    if (!id) {
      id = uuidV4();
      this._idsByClaim.set(claim, id);
      this._saveIds();
    }

    return id;
  }

  retireId(id: string): void {
    const claim = keyForValue(this._idsByClaim, id);
    if (!claim) {
      return;
    }

    this._idsByClaim.delete(claim);
    this._saveIds();
  }

  private _saveIds() {
    const record = mapToObject(this._idsByClaim);
    this._database.set(this._dataKey, record);
  }

  private _loadIds() {
    const record = this._database.get<Record<string, string>>(
      this._dataKey,
      {},
    );
    this._idsByClaim.clear();
    objectToMap(record, this._idsByClaim);
  }
}

function flattenClaims(claims: string | IdClaims): string {
  if (typeof claims === "string") {
    return `claim="${claims}"`;
  }

  const masterClaim = Object.keys(claims).reduce((str, claimKey) => {
    const value = claims[claimKey].replace(/\'/g, "");
    return `${str}${claimKey}='${value}';`;
  }, "");

  return masterClaim.substr(0, masterClaim.length - 1);
}
