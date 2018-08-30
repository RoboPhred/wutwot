export interface ThingActionRequestToken {
    readonly id: string;
    readonly timeRequested: string;
    done(): void;
}
