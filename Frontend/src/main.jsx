// Frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Reading from "./Pages/Reading.jsx";
import History from "./Pages/History.jsx";

console.log("✅ main.jsx 진입—Vite 번들 로드 완료");

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Reading />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
