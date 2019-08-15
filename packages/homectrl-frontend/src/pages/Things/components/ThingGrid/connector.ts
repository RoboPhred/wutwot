import { connect } from "react-redux";

import { createStructuredSelector } from "@/state";
import { thingsSelector } from "@/services/homectrl/selectors/things";
import { refreshThings } from "@/services/homectrl/actions/refresh-things";

const mapStateToProps = createStructuredSelector({
  things: thingsSelector
});

const mapDispatchToProps = {
  onRefreshThings: refreshThings as any // turns out type safe actions are hideously type insafe
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
