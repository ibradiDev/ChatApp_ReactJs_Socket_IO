import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={'/chat'} />} />
        <Route path="/auth/register" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />
        {/* <Route path="/setAvatar" element={<SetAvatar />} /> */}
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
