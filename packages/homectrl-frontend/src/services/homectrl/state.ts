import { Thing } from "./types/Thing";

export interface HomeCtrlState {
  isRefreshing: boolean;
  thingsById: Record<string, Thing>;
  errorMessage: string | null;
}

export const defaultHomeCtrlState: Readonly<HomeCtrlState> = Object.seal({
  isRefreshing: false,
  thingsById: {},
  errorMessage: null
});
