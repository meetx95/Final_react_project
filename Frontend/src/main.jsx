import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import PlayerContextProvider from "./contex/PlayerContex.jsx";
import AuthProvider from "./contex/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PlayerContextProvider>
          <App />
        </PlayerContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
