import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./componentes/landing.jsx";
import Login from "./componentes/login.jsx";
import Cadastro from "./componentes/cadastro.jsx";
import Dados from "./componentes/dados.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Produtos from "./componentes/card_produto.jsx";
import RegistrarDoacao from "./componentes/RegistrarDoacao.jsx"; // Importando o novo componente
import ProtectedRoute from "./componentes/ProtectedRoute";
import { AuthProvider } from "./componentes/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/dados/:productName"
            element={<ProtectedRoute element={<Dados />} />}
          />
          <Route
            path="/doacoes"
            element={<ProtectedRoute element={<Produtos />} />}
          />
          <Route
            path="/registrar-doacao"
            element={<ProtectedRoute element={<RegistrarDoacao />} />} // Rota para a página de registrar doação
          />
        </Routes>
      </AuthProvider>
    </Router>
  </StrictMode>
);
