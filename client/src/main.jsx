import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Landing from "./componentes/landing";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./componentes/login";
import Cadastro from "./componentes/cadastro";
import Dados from "./componentes/dados";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Dados />
  </StrictMode>
);
