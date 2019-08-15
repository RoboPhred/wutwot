import { connect } from "react-redux";

import { AppState } from "@/state";

import { thingsByIdSelector } from "@/services/homectrl/selectors/things";

export interface InputProps {
  thingId: string;
}

function mapStateToProps(state: AppState, props: InputProps) {
  const thing = thingsByIdSelector(state)[props.thingId];
  return { thing };
}

export default connect(mapStateToProps);
