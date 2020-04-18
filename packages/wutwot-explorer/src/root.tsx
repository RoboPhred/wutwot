import * as React from "react";

import { HashRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";

import I18NProvider from "./services/i18n/components/I18NProvider";

import theme from "./theme";
import Routes from "./routes";

const Root: React.FC = () => {
  return (
    <I18NProvider>
      <HashRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Routes />
        </MuiThemeProvider>
      </HashRouter>
    </I18NProvider>
  );
};
export default Root;
