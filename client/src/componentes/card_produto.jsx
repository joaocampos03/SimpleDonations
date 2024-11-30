import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Header from "./header.jsx";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext"; // Importe o AuthContext

// Card Component
const Card = ({
  customId, // Atualizado para customId
  title,
  image,
  description,
  location,
  status,
  isOpen,
  toggleOpen,
}) => {
  const navigate = useNavigate();

  const handleMoreInfo = () => {
    navigate(`/dados/${customId}`, {
      // Usando customId para navegar
      state: { customId, title, image, description, location, status },
    });
  };

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden w-full max-w-md mx-auto relative">
      <img
        src={image || "https://via.placeholder.com/150"}
        alt={title}
        className="w-full h-80 object-cover rounded-t-md"
      />
      <div className="p-4 flex flex-col items-center">
        <h2 className="text-black font-bold text-center">{title}</h2>
        <p className="text-gray-600 text-sm">{location}</p>
        <p className="text-gray-500 text-xs">{status}</p>
        <button
          onClick={toggleOpen}
          className="text-blue-500 mt-2 flex items-center justify-center"
        >
          <span className={`${isOpen ? "rotate-180" : ""}`}>▼</span>
        </button>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute bottom-0 left-0 w-full overflow-hidden`}
      >
        <div className="bg-white">
          <p className="p-4 text-center">{description}</p>
          <div className="flex">
            <button
              onClick={handleMoreInfo}
              className="bg-blue-500 font-semibold text-white p-2 w-1/2"
            >
              Saiba mais
            </button>
            <button
              onClick={toggleOpen}
              className="bg-red-500 font-semibold text-white p-2 w-1/2"
            >
              Voltar
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Produtos = () => {
  const [openCards, setOpenCards] = useState({});
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // Novo estado para filtro de status
  const itemsPerPage = window.innerWidth <= 768 ? 5 : 9;
  const navigate = useNavigate();

  // Obtenha o perfil do contexto
  const { perfil } = useContext(AuthContext);

  // Fetch data from API
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch(
          "https://simple-donations-backendv4.vercel.app/doacoes"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch donations data");
        }
        const data = await response.json();

        // Ajuste do filtro com base no perfil
        const filteredData =
          perfil === "doador"
            ? data // Exibe todas as doações (disponíveis e indisponíveis) para o doador
            : data.filter((donation) => donation.status === "disponivel"); // Exibe apenas as doações disponíveis para outros perfis

        setDonations(filteredData);
        setFilteredDonations(filteredData);
        setPageCount(Math.ceil(filteredData.length / itemsPerPage)); // Set the number of pages
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDonations();
  }, [perfil]); // Adicionando perfil como dependência

  // Get unique locations
  const uniqueLocations = [
    ...new Set(donations.map((donation) => donation.loc_prod)),
  ];

  // Filtra as doações com base no status selecionado
  useEffect(() => {
    let filtered = donations;

    // Filtro de localização
    if (selectedLocation) {
      filtered = filtered.filter(
        (donation) => donation.loc_prod === selectedLocation
      );
    }

    // Filtro de status
    if (selectedStatus) {
      filtered = filtered.filter(
        (donation) => donation.status === selectedStatus
      );
    }

    setFilteredDonations(filtered);
    setPageCount(Math.ceil(filtered.length / itemsPerPage)); // Atualiza a contagem de páginas
  }, [selectedLocation, selectedStatus, donations]);

  const toggleCard = (id) => {
    setOpenCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleLocationChange = (event) => {
    const selected = event.target.value;
    setSelectedLocation(selected);
  };

  const handleStatusChange = (event) => {
    const selected = event.target.value;
    setSelectedStatus(selected);
  };

  // Get the current items to display based on the current page
  const currentItems = filteredDonations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
      <Header />
      <div className="p-8 mt-16">
        {/* Exibir filtros apenas na primeira página */}
        {currentPage === 0 && (
          <>
            {/* Filtro de localização */}
            <div className="flex justify-center mb-4">
              <div className="w-1/2 sm:w-1/3 md:w-1/4 shadow-lg rounded-md">
                <select
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  className="p-3 w-full border-2 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="">Selecione um local</option>
                  {uniqueLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filtro de status (somente para doadores) */}
            {perfil === "doador" && (
              <div className="flex justify-center mb-4">
                <div className="w-1/2 sm:w-1/3 md:w-1/4 shadow-lg rounded-md">
                  <select
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className="p-3 w-full border-2 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="">Selecione o status</option>
                    <option value="disponivel">Disponível</option>
                    <option value="indisponivel">Indisponível</option>
                  </select>
                </div>
              </div>
            )}
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {error && <p className="text-red-500">{error}</p>}
          {currentItems.map((donation) => (
            <Card
              key={donation.custom_id}
              customId={donation.custom_id} // Usando customId agora
              title={donation.nome_prod}
              image={
                donation.img_prod.length > 0
                  ? donation.img_prod[0]
                  : "https://via.placeholder.com/150"
              }
              description={donation.desc_prod}
              location={`Localização: ${donation.loc_prod}`}
              status={`Status: ${donation.status}`}
              isOpen={!!openCards[donation.custom_id]}
              toggleOpen={() => toggleCard(donation.custom_id)}
            />
          ))}
          {donations.length === 0 && !error && (
            <p className="text-center text-gray-500">
              Nenhuma doação disponível
            </p>
          )}
        </div>
        <div className="flex justify-center mt-4">
          {perfil === "doador" && (
            <button
              onClick={() => navigate("/registrar-doacao")}
              className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-500 transition-all"
            >
              Adicionar uma Doação
            </button>
          )}
        </div>
        {pageCount > 1 && (
          <div className="flex justify-center mt-4 relative z-10">
            {" "}
            {/* Adicionado relative para a paginação */}
            <div className="flex space-x-2 overflow-x-auto max-w-full">
              <ReactPaginate
                previousLabel={"← Anterior"}
                nextLabel={"Próximo →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"flex space-x-2"}
                pageClassName={"px-4 py-2 border border-blue-500 rounded-md"}
                previousClassName={
                  "px-4 py-2 border border-blue-500 rounded-md"
                }
                nextClassName={"px-4 py-2 border border-blue-500 rounded-md"}
                activeClassName={"bg-blue-500 text-white"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Produtos;
