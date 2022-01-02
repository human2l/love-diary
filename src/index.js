import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <p></p>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
