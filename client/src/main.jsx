import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Landing from "./componentes/landing.jsx";
import Login from "./componentes/login.jsx";
import Cadastro from "./componentes/cadastro.jsx";
import Dados from "./componentes/dados.jsx";
import Produtos from "./componentes/card_produto.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dados" element={<Dados />} />
        <Route path="/doacoes" element={<Produtos />} />
      </Routes>
    </Router>
  </StrictMode>
);
