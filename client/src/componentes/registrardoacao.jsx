import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroDoacao() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [data, setData] = useState("");
  const [status, setStatus] = useState("");
  const [imagens, setImagens] = useState([]);
  const [error, setError] = useState("");
  const [isDoacaoRegistrada, setIsDoacaoRegistrada] = useState(false);

  const navigate = useNavigate();

  // Função para lidar com a mudança nas imagens
  const handleImageChange = (e) => {
    // Converte o FileList em um array normal
    setImagens(Array.from(e.target.files));
  };

  // Função para lidar com o cadastro da doação
  const handleCadastroDoacao = async (e) => {
    e.preventDefault();

    // Validação simples dos campos
    if (!titulo || !descricao || !local || !data || !status) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    // Monta os dados para a doação
    const doacaoData = {
      titulo_prod: titulo,
      desc_prod: descricao,
      loc_prod: local,
      data_prod: data,
      status: status,
    };

    try {
      // Primeiro, faz o upload das imagens
      const formData = new FormData();
      imagens.forEach((img) => formData.append("images", img)); // Agora 'imagens' é um array

      const uploadResponse = await fetch(
        "https://simple-donations-backendv4.vercel.app/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadResult = await uploadResponse.json();

      if (uploadResponse.ok) {
        // Se o upload foi bem-sucedido, adiciona as URLs das imagens no campo img_prod
        doacaoData.img_prod = uploadResult.urls; // Adiciona as URLs das imagens

        // Envia a requisição para registrar a doação
        const response = await fetch(
          "https://simple-donations-backendv4.vercel.app/registrarDoacao",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(doacaoData), // Envia os dados da doação com as URLs das imagens
          }
        );

        const result = await response.json();

        if (response.ok) {
          setIsDoacaoRegistrada(true);
          setTimeout(() => {
            navigate("/doacoes"); // Redireciona para a página de doações
          }, 2000);
        } else {
          setError(result.error || "Erro ao registrar a doação");
        }
      } else {
        setError(uploadResult.error || "Erro ao fazer upload das imagens");
      }
    } catch (error) {
      setError("Erro ao registrar a doação ou ao fazer o upload das imagens");
      console.error("Erro:", error);
    }
  };

  if (isDoacaoRegistrada) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Doação registrada com sucesso!</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          className="shadow-lg max-w-[400px] w-full mx-auto bg-white p-4"
          onSubmit={handleCadastroDoacao}
        >
          <h2 className="text-4xl font-bold text-center py-6">
            Registrar Doação
          </h2>

          <div className="flex flex-col py-2">
            <label>Título da Doação</label>
            <input
              className="border p-2"
              type="text"
              name="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="flex flex-col py-2">
            <label>Descrição</label>
            <input
              className="border p-2"
              type="text"
              name="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="flex flex-col py-2">
            <label>Local</label>
            <input
              className="border p-2"
              type="text"
              name="local"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />
          </div>

          <div className="flex flex-col py-2">
            <label>Data</label>
            <input
              className="border p-2"
              type="date"
              name="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <div className="flex flex-col py-2">
            <label>Status</label>
            <input
              className="border p-2"
              type="text"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>

          <div className="flex flex-col py-2">
            <label>Imagens</label>
            <input
              className="border p-2"
              type="file"
              multiple
              onChange={handleImageChange}
            />
          </div>

          {error && <p className="text-red-500 text-center py-2">{error}</p>}

          <button
            type="submit"
            className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Registrar Doação
          </button>
        </form>
      </div>
    </div>
  );
}
