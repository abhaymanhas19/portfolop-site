import { createRoot } from "react-dom/client";
import "./index.css";  // This imports Tailwind + your custom CSS
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PortfolioProvider } from "./hooks/usePortfolio";
 
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </BrowserRouter>
);