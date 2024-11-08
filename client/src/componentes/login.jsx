import React, { useState } from "react";
import loginImg from "../assets/imagem2.jpg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Added state to handle login success

  const handleLogin = (e) => {
    e.preventDefault();

    const hardcodedUsername = "admin";
    const hardcodedPassword = "admin";

    if (username === hardcodedUsername && password === hardcodedPassword) {
      setIsLoggedIn(true); // Set login success state
    } else {
      setError("Usuário ou senha incorretos");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Welcome to the Dashboard!</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-dvh object-cover"
          src={loginImg}
          alt="Imagem de Login"
        />
      </div>

      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto bg-white p-4"
          onSubmit={handleLogin}
        >
          <h2 className="text-4xl font-bold text-center py-6">
            SimpleDonations
          </h2>
          <div className="flex flex-col py-2">
            <label>Nome de Usuário</label>
            <input
              className="border p-2"
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Senha</label>
            <input
              className="border p-2"
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
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
            >
              Criar nova conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
