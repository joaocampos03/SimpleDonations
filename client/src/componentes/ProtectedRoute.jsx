import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, perfil } = useContext(AuthContext); // Agora, pega o perfil também
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Verifica se o perfil é 'doador' para a rota '/registrar-doacao'
  if (perfil !== "doador" && window.location.pathname === "/registrar-doacao") {
    return <Navigate to="/doacoes" />; // Redireciona para a página de doações se o perfil não for 'doador'
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
