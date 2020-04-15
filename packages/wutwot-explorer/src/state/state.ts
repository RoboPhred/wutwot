import { HomeCtrlState, defaultHomeCtrlState } from "@/services/homectrl/state";

export interface AppState {
  services: {
    homectrl: HomeCtrlState;
  };
}

export const defaultAppState: Readonly<AppState> = Object.seal({
  services: {
    homectrl: defaultHomeCtrlState
  }
});
