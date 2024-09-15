import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BooksContextProvider } from "./context/BookContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BooksContextProvider>
      <App />
    </BooksContextProvider>
);
