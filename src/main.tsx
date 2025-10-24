// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./login";
import Success from "./success";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Login />} />
                <Route path="/success" element={<Success />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
