import React, { useState } from "react";
import loginImg from "../assets/imagem2.jpg";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [document, setDocument] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const navigate = useNavigate();

  // Função para lidar com o registro do usuário
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validação simples
    if (
      !name ||
      !username ||
      !birthDate ||
      !email ||
      !password ||
      !phone ||
      !document
    ) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    // Monta os dados para enviar ao backend, incluindo o perfil como "doador"
    const userData = {
      nome: name,
      nickname: username,
      data_nasc: birthDate,
      email: email,
      senha: password,
      endereco: address,
      telefone: phone,
      documento: document,
      perfil: "beneficiado",
    };

    try {
      // Envia a requisição POST ao backend para cadastrar o usuário
      const response = await fetch(
        "https://simple-donations-backendv4.vercel.app/cadastrarUsuario",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData), // Envia os dados como JSON
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Se a resposta for OK, o cadastro foi bem-sucedido
        setIsRegistered(true);

        // Redireciona para a página de login após 2 segundos
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        // Se houver erro, mostra a mensagem
        setError(result.error || "Erro ao registrar o usuário");
      }
    } catch (error) {
      setError("Erro ao enviar a requisição");
      console.error("Erro ao registrar usuário:", error);
    }
  };

  // Função para lidar com mudanças nos campos de input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "username") setUsername(value);
    if (name === "birthDate") setBirthDate(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "address") setAddress(value);
    if (name === "phone") setPhone(value);
    if (name === "document") setDocument(value);
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

          <div className="flex flex-col py-2">
            <label>Endereço</label>
            <input
              className="border p-2"
              type="text"
              name="address"
              value={address}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col py-2">
            <label>Telefone</label>
            <input
              className="border p-2"
              type="text"
              name="phone"
              value={phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col py-2">
            <label>Documento (CPF ou CNPJ)</label>
            <input
              className="border p-2"
              type="text"
              name="document"
              value={document}
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
