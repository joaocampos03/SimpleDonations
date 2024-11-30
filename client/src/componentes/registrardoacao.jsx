import React, { useState, useEffect } from "react";
import Header from "./header.jsx";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick"; // Importando o Slider do react-slick

export default function CadastroDoacao() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [data, setData] = useState("");
  const [imagens, setImagens] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [error, setError] = useState("");
  const [isDoacaoRegistrada, setIsDoacaoRegistrada] = useState(false);

  const navigate = useNavigate();

  // Fetch para carregar os endereços ao montar o componente
  useEffect(() => {
    const fetchEnderecos = async () => {
      try {
        const response = await fetch(
          "https://simple-donations-backendv4.vercel.app/enderecos"
        );
        if (response.ok) {
          const data = await response.json();
          setEnderecos(data); // Configurando os endereços recebidos
        } else {
          setError("Não foi possível carregar os endereços.");
        }
      } catch (error) {
        console.error("Erro ao buscar endereços:", error);
        setError("Erro ao carregar endereços.");
      }
    };

    fetchEnderecos();
  }, []);

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    if (selectedImages.length + imagens.length > 3) {
      setError("Você pode selecionar no máximo 3 imagens.");
      return;
    }

    setImagens([...imagens, ...selectedImages]);
    setError(""); // Limpa qualquer mensagem de erro
  };

  const clearImages = () => {
    setImagens([]);
    setError("");
  };

  const handleCadastroDoacao = async (e) => {
    e.preventDefault();

    if (!titulo || !descricao || !local || !data) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    const doacaoData = {
      titulo_prod: titulo,
      desc_prod: descricao,
      loc_prod: local,
      data_prod: data,
      status: "disponivel", // Status fixo como 'disponivel'
    };

    try {
      const formData = new FormData();
      imagens.forEach((img) => formData.append("images", img));

      const uploadResponse = await fetch(
        "https://simple-donations-backendv4.vercel.app/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadResult = await uploadResponse.json();

      if (uploadResponse.ok) {
        doacaoData.img_prod = uploadResult.urls;

        const response = await fetch(
          "https://simple-donations-backendv4.vercel.app/registrarDoacao",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(doacaoData),
          }
        );

        const result = await response.json();

        if (response.ok) {
          setIsDoacaoRegistrada(true);
          setTimeout(() => {
            navigate("/doacoes");
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

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-300 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl w-full bg-white p-8 shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row items-start justify-between space-y-8 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-1/2">
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
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    type="text"
                    name="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>

                <div className="flex flex-col py-2">
                  <label>Descrição</label>
                  <textarea
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-none h-24"
                    name="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    maxLength={200}
                    rows="4"
                  />
                  <span className="text-gray-500 text-sm">
                    {descricao.length} / 200
                  </span>
                </div>

                <div className="flex flex-col py-2">
                  <label>Local</label>
                  <select
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    name="local"
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione um local
                    </option>
                    {enderecos.map((endereco, index) => (
                      <option key={index} value={endereco}>
                        {endereco}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col py-2">
                  <label>Data</label>
                  <input
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    type="date"
                    name="data"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  />
                </div>

                <div className="flex flex-col py-2">
                  <label>Imagens (máximo de 3)</label>
                  <input
                    className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    capture="environment"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-center py-2">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition duration-200"
                >
                  Registrar Doação
                </button>
              </form>

              {imagens.length > 0 && (
                <button
                  onClick={clearImages}
                  className="w-full py-2 mt-4 bg-red-600 hover:bg-red-500 text-white rounded-lg transition duration-200"
                >
                  Limpar Imagens
                </button>
              )}
            </div>

            <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
              <Slider {...sliderSettings}>
                {imagens.map((imagem, index) => (
                  <div key={index}>
                    <img
                      src={URL.createObjectURL(imagem)}
                      alt={`Imagem ${index + 1}`}
                      className="h-[600px] w-full object-cover rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
