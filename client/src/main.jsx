import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Landing from "./componentes/landing.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./componentes/login.jsx";
import Cadastro from "./componentes/cadastro.jsx";
import Dados from "./componentes/dados.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Dados />
  </StrictMode>
);
