import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ToastProvider from "./contexts/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ToastProvider position="top-right">
            <App />
        </ToastProvider>
    </StrictMode>
);
