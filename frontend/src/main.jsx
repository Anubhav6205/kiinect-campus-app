import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { Provider } from "react-redux";

import store from "./app/store";
import { DEMO_MODE } from "./demo/demoMode";
import { installDemoApi } from "./demo/demoApi";

if (DEMO_MODE) installDemoApi();

TimeAgo.addDefaultLocale(en);

const rootElement = document.getElementById("root");
const app = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
createRoot(rootElement).render(app);
