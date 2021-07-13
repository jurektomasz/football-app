import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./index.scss";

library.add(fas);

ReactDOM.render(<App />, document.getElementById("root"));
