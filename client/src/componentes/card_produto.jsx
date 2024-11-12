import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./header.jsx";

// Card Component
import ReactPaginate from "react-paginate";

// Card Component
const Card = ({
  title,
  image,
  description,
  location,
  status,
  isOpen,
  toggleOpen,
}) => (
  <div className="bg-white shadow-md rounded-md overflow-hidden w-full max-w-md mx-auto relative">
    <img
      src={image || "https://via.placeholder.com/150"}
      alt={title}
      className="w-full h-48 object-cover rounded-t-md"
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
          <button className="bg-blue-500 font-semibold text-white p-2 w-1/2">
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

// Produtos Component (Main Page with Pagination)
const Produtos = () => {
  const [openCards, setOpenCards] = useState({});
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = window.innerWidth <= 768 ? 5 : 9; // 5 items for mobile, 9 for PC

  // Fetch data from API
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch(
          "https://simple-donations-backendv3.vercel.app/doacoes"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch donations data");
        }
        const data = await response.json();
        setDonations(data);
        setPageCount(Math.ceil(data.length / itemsPerPage)); // Set the number of pages
      } catch (err) {
        setError(err.message);
      }
    };
    fetchDonations();
  }, []);

  const toggleCard = (id) => {
    setOpenCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Get the current items to display based on the current page
  const currentItems = donations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
      <Header />
      <div className="p-8 mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {error && <p className="text-red-500">{error}</p>}
        {currentItems.map((donation) => (
          <Card
            key={donation.custom_id}
            title={donation.nome_prod}
            image={
              donation.img_prod !== "teste2"
                ? donation.img_prod
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
          <p className="text-center text-gray-500">Nenhuma doação encontrada</p>
        )}
      </div>
      {pageCount > 1 && (
        <div className="flex justify-center mt-4">
          <ReactPaginate
            previousLabel={"← Anterior"}
            nextLabel={"Próximo →"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"flex space-x-2"}
            activeClassName={"bg-blue-500 text-white"}
            pageClassName={
              "px-4 py-2 cursor-pointer border border-gray-300 rounded-md"
            }
            previousClassName={
              "px-4 py-2 cursor-pointer border border-gray-300 rounded-md"
            }
            nextClassName={
              "px-4 py-2 cursor-pointer border border-gray-300 rounded-md"
            }
          />
        </div>
      )}
    </div>
  );
};

export default Produtos;
