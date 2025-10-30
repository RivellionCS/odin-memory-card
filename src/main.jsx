import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/reset.css";
import "./styles/index.css";
import { Header } from "./components/Header.jsx";
import { CardGrid } from "./components/CardGrid.jsx";
import { Footer } from "./components/Footer.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <CardGrid />
    <Footer />
  </StrictMode>
);
