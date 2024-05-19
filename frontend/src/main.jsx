import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import { StateContextProvider } from "./context/stateContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <StateContextProvider>
            <RouterProvider router={router} />
        </StateContextProvider>
    </React.StrictMode>
);
