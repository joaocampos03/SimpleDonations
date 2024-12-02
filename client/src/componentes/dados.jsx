import React, { useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import Header from "./header";
import { useLocation, useParams, useNavigate } from "react-router-dom"; // Importando useNavigate
import AuthContext from "./AuthContext"; // Importando o contexto de autenticação

const Dados = () => {
  const { customId } = useParams(); // Para pegar o customId da URL
  const location = useLocation();
  const [productData, setProductData] = useState(null); // Estado para armazenar os dados do produto
  const [loading, setLoading] = useState(true); // Estado para verificar se os dados estão carregando
  const [error, setError] = useState(null); // Estado para armazenar erros

  const { perfil, nome, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchProductData = async () => {
    try {
      const response = await fetch(
        "https://simple-donations-backendv4.vercel.app/doacoes"
      );
      const data = await response.json();

      // Encontrando o produto com base no customId
      const product = data.find(
        (item) => item.custom_id === parseInt(customId, 10)
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

  // Função para deletar o produto
  const handleDeletarDoacao = async () => {
    try {
      const response = await fetch(
        `https://simple-donations-backendv4.vercel.app/deletaProduto/${customId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert(result.messsage); // Exibe mensagem de sucesso
        navigate("/doacoes"); // Redireciona para a página /doacoes após a exclusão
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao deletar a doação:", error);
      alert("Erro ao deletar a doação.");
    }
  };

  // Função para atualizar o status do produto
  const handleReceberDoacao = async () => {
    if (perfil !== "beneficiado") return;

    try {
      const response = await fetch(
        `https://simple-donations-backendv4.vercel.app/atualizaStatus/${customId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "indisponivel",
            data_res: new Date().toISOString(),
            beneficiado: nome, // Agora usando o nome diretamente do contexto
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        fetchProductData();
        navigate("/doacoes");
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
      alert("Erro ao atualizar o status.");
    }
  };

  // Função para reestabelecer a doação
  const handleReestabelecerDoacao = async () => {
    try {
      const response = await fetch(
        `https://simple-donations-backendv4.vercel.app/atualizaStatus/${customId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "disponivel",
            data_res: "", // Limpa a data_res
            beneficiado: "", // Limpa o beneficiado
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert(result.message); // Exibe mensagem de sucesso
        fetchProductData();
        navigate("/doacoes");
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao reestabelecer a doação:", error);
      alert("Erro ao reestabelecer a doação.");
    }
  };

  // Função para formatar a data para o formato brasileiro
  const formatarData = (data) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(data).toLocaleDateString("pt-BR", options);
  };

  // UseEffect para buscar dados do produto ao montar o componente
  useEffect(() => {
    fetchProductData();
  }, [customId]);

  // Se ainda estiver carregando ou houver erro, exibe uma mensagem
  if (loading || authLoading) return <div>Carregando...</div>;
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
                  defaultValue={productData.status}
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
              {productData.status === "disponivel" && perfil === "doador" && (
                <button
                  onClick={handleDeletarDoacao}
                  className="bg-red-600 text-white rounded-lg p-3 w-full hover:bg-red-500 transition duration-200"
                >
                  Deletar Doação
                </button>
              )}

              {productData.status === "disponivel" &&
                perfil === "beneficiado" && (
                  <button
                    onClick={handleReceberDoacao}
                    className="bg-green-600 text-white rounded-lg p-3 w-full hover:bg-green-500 transition duration-200"
                  >
                    Receber Doação
                  </button>
                )}
              {perfil === "doador" && productData.status === "indisponivel" && (
                <div>
                  <label className="block text-md font-bold text-gray-600">
                    {formatarData(productData.data_res)} -{" "}
                    {productData.beneficiado}
                  </label>
                  <button
                    onClick={handleReestabelecerDoacao}
                    className="bg-green-600 text-white rounded-lg p-3 w-full hover:bg-blue-500 transition duration-200"
                  >
                    Reestabelecer Doação
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dados;
