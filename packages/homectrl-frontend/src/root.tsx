import * as React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";

import StoreProvider from "./store/components/StoreProvider";
import App from "./components/App";

const Root = () => (
  <React.Fragment>
    <CssBaseline />
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.Fragment>
);
export default Root;
