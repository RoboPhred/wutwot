import * as React from "react";
import { render } from "react-dom";

import "es6-promise/auto";
import "typeface-roboto";
import "whatwg-fetch";

import "./style/root.css";

import Root from "./root";

render(<Root />, document.getElementById("root"));
