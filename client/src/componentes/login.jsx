import React, { useState, useContext } from "react";
import loginImg from "../assets/imagem2.jpg";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext"; // Importing AuthContext

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); // Using login function from AuthContext
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const isLoginSuccessful = await login(username, password);
    if (isLoginSuccessful) {
      navigate("/doacoes"); // Redirect to donations page after successful login
    } else {
      setError("Usuário ou senha incorretos");
    }
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="shadow-lg grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-dvh object-cover"
          src={loginImg}
          alt="Imagem de Login"
        />
      </div>

      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          className="shadow-lg max-w-[400px] w-full mx-auto bg-white p-4"
          onSubmit={handleLogin}
        >
          <h2
            className="text-4xl font-bold text-center py-6 hover:bg-indigo-300 hover:cursor-pointer"
            onClick={handleNavigate}
          >
            Simple Donations
          </h2>
          <div className="flex flex-col py-2">
            <label>Nome de Usuário</label>
            <input
              className="border p-2"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Senha</label>
            <input
              className="border p-2"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-center py-2">{error}</p>}
          <button
            type="submit"
            className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Login
          </button>
          <div className="flex justify-between items-center">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Lembre-se de mim
            </p>
            <button
              type="button"
              className="hover:text-indigo-400 py-2 text-black"
              onClick={() => navigate("/cadastro")}
            >
              Criar nova conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
