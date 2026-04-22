import { createRoot } from "react-dom/client";
import "./index.css";  // This imports Tailwind + your custom CSS
import App from "./App";
import { BrowserRouter } from "react-router-dom";
 
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);