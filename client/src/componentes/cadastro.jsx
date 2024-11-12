import React, { useState } from "react";
import loginImg from "../assets/imagem2.jpg";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("NA");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !username || !birthDate || !email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    // Simulating registration success
    setIsRegistered(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "username") setUsername(value);
    if (name === "birthDate") setBirthDate(value);
    if (name === "gender") setGender(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  if (isRegistered) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Cadastro realizado com sucesso!</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img
          className="w-full h-dvh object-cover"
          src={loginImg}
          alt="Imagem de Cadastro"
        />
      </div>

      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          className="shadow-lg max-w-[400px] w-full mx-auto bg-white p-4"
          onSubmit={handleRegister}
        >
          <h2 className="text-4xl font-bold text-center py-6">Cadastro</h2>

          <div className="flex flex-col py-2">
            <label>Nome Completo</label>
            <input
              className="border p-2"
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>

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
            <label>Data de Nascimento</label>
            <input
              className="border p-2"
              type="date"
              name="birthDate"
              value={birthDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col py-2">
            <label>Gênero</label>
            <select
              className="border p-2"
              name="gender"
              value={gender}
              onChange={handleInputChange}
            >
              <option value="NA" disabled hidden>
                Selecione
              </option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className="flex flex-col py-2">
            <label>Email</label>
            <input
              className="border p-2"
              type="email"
              name="email"
              value={email}
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
            Registrar
          </button>

          <div className="flex justify-between items-center">
            <button
              type="button"
              className="hover:text-indigo-400 py-2 text-black"
              onClick={() => navigate("/login")}
            >
              Já tem uma conta? Faça Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
