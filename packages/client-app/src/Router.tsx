import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { NotFound } from "./NotFound";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/:id" element={<App />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </BrowserRouter>
);
