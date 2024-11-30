import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Header from "./header";
import { useLocation, useParams } from "react-router-dom";

const Dados = () => {
  const { customId } = useParams(); // Para pegar o customId da URL
  const location = useLocation();
  const [productData, setProductData] = useState(null); // Estado para armazenar os dados do produto
  const [loading, setLoading] = useState(true); // Estado para verificar se os dados estão carregando
  const [error, setError] = useState(null); // Estado para armazenar erros

  // Função para buscar os dados do produto a partir do endpoint
  const fetchProductData = async () => {
    try {
      const response = await fetch(
        "https://simple-donations-backendv4.vercel.app/doacoes"
      );
      const data = await response.json();

      // Encontrando o produto com base no customId
      const product = data.find(
        (item) => item.custom_id === parseInt(customId) // Ajustando para comparar com o customId
      );

      if (product) {
        setProductData(product);
      } else {
        setError("Produto não encontrado");
      }
    } catch (error) {
      setError("Erro ao carregar os dados");
    } finally {
      setLoading(false);
    }
  };

  // UseEffect para fazer a requisição quando o componente é montado
  useEffect(() => {
    fetchProductData();
  }, [customId]);

  // Se ainda estiver carregando ou houver erro, exibimos uma mensagem
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  // Acessando o array de imagens
  const images = productData.img_prod || [];

  // Verificando se há mais de uma imagem
  const isSingleImage = images.length === 1;

  // Definindo configurações para o slider
  const settings = {
    dots: true,
    infinite: images.length > 1, // Ativa o infinito apenas se houver mais de uma imagem
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: true,
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-300 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl w-full bg-white p-8 shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row items-start justify-between space-y-8 md:space-y-0 md:space-x-8">
            {/* Se for uma única imagem, exibe apenas a imagem diretamente */}
            <div className="w-full md:w-1/2 mr-4 mb-4 md:mb-0">
              {isSingleImage ? (
                <img
                  src={images[0]}
                  alt="Imagem única"
                  className="h-[600px] w-full object-cover rounded-lg shadow-md"
                />
              ) : (
                <Slider {...settings}>
                  {images.map((imgUrl, index) => (
                    <div key={index}>
                      <img
                        src={imgUrl}
                        alt={`Imagem ${index + 1}`}
                        className="h-[600px] w-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                  ))}
                </Slider>
              )}
            </div>

            {/* Informações do produto */}
            <div className="w-full md:w-1/2 space-y-8">
              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-2">
                  Título do Produto
                </label>
                <input
                  defaultValue={productData.nome_prod}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-2">
                  Descrição do Produto
                </label>
                <textarea
                  defaultValue={productData.desc_prod}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-none h-24"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-2">
                  Status do Produto
                </label>
                <input
                  defaultValue="Disponível" // Status fixo como "disponível"
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-2">
                  Localização
                </label>
                <input
                  defaultValue={productData.loc_prod}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  readOnly
                />
              </div>
              <button className="bg-indigo-600 text-white rounded-lg p-3 w-full hover:bg-blue-500 transition duration-200">
                Doar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dados;
