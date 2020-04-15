import * as React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";

import { HashRouter as Router } from "react-router-dom";

import StoreProvider from "./store/components/StoreProvider";
import App from "./components/App";

const Root = () => (
  <Router>
    <CssBaseline />
    <StoreProvider>
      <App />
    </StoreProvider>
  </Router>
);
export default Root;
