import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [perfil, setPerfil] = useState(null); // Estado para o perfil
  const [nome, setNome] = useState(null); // Novo estado para o nome
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedPerfil = localStorage.getItem("perfil");
    const storedNome = localStorage.getItem("nome"); // Recupera o nome armazenado
    if (storedAuth === "true") {
      setIsAuthenticated(true);
      setPerfil(storedPerfil);
      setNome(storedNome); // Define o nome no estado
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch(
        "https://simple-donations-backendv4.vercel.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            nickname: username,
            senha: password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setPerfil(result.perfil); // Armazena o perfil
        setNome(result.nome); // Armazena o nome
        localStorage.setItem("isAuthenticated", "true"); // Persist login state
        localStorage.setItem("perfil", result.perfil); // Armazena o perfil no localStorage
        localStorage.setItem("nome", result.nome); // Armazena o nome no localStorage
        navigate("/doacoes"); // Redirect to donations page after login
      } else {
        return false; // If login fails, return false
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPerfil(null); // Limpa o perfil
    setNome(null); // Limpa o nome
    localStorage.removeItem("isAuthenticated"); // Clear login state
    localStorage.removeItem("perfil"); // Limpa o perfil no localStorage
    localStorage.removeItem("nome"); // Limpa o nome no localStorage
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, perfil, nome, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
