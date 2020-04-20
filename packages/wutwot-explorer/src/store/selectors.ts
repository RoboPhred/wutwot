import { useSelector } from "react-redux";

import { AppState } from "@/state";

export function useAppSelector<T>(selector: (state: AppState) => T): T {
  return useSelector((state: AppState) => selector(state));
}
