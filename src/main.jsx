import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserContextProvider from "./Context/UserContext.jsx";
import "./index.css";

// Apply saved or system theme BEFORE rendering
const savedTheme = localStorage.getItem("theme");
const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  document.documentElement.classList.add("dark");
  document.body.className =
    "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-200";
} else {
  document.documentElement.classList.remove("dark");
  document.body.className =
    "bg-gradient-to-b from-green-50 via-white to-green-50 text-gray-800";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);