import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { ChatProvider } from "./context/ChatContext";

import "./index.css";
import "./styles/globals.css";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <ChatProvider>

        <App />

      </ChatProvider>

    </BrowserRouter>

  </React.StrictMode>

);