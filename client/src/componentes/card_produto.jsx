import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "./header.jsx";

// Mock de dados das doações
const donations = [
  {
    id: 1,
    title: "Roupas de Inverno",
    image: "https://placehold.co/600x400",
    description: "Doação de roupas de inverno para quem mais precisa.",
  },
  {
    id: 2,
    title: "Materiais Escolares",
    image: "https://placehold.co/1000x1000",
    description:
      "Material escolar para estudantes em situação de vulnerabilidade.",
  },
  {
    id: 3,
    title: "Alimentos não-perecíveis",
    image: "https://via.placeholder.com/300",
    description: "Itens de alimentação básica para famílias necessitadas.",
  },
  {
    id: 4,
    title: "Brinquedos",
    image: "https://placehold.co/600x400",
    description: "Doação de brinquedos para crianças carentes.",
  },
  {
    id: 5,
    title: "Livros Infantis",
    image: "https://placehold.co/600x400",
    description: "Livros para incentivar a leitura entre as crianças.",
  },
  {
    id: 6,
    title: "Produtos de Higiene",
    image: "https://placehold.co/600x400",
    description: "Doação de itens de higiene pessoal para quem precisa.",
  },
];

const Card = ({ title, image, description, isOpen, toggleOpen }) => (
  <div>
    <Header />
    <div className="bg-white shadow-md rounded-md overflow-hidden w-full max-w-md mx-auto relative">
      {/* Imagem com bordas arredondadas */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-md"
      />
      {/* Título e botão de seta */}
      <div className="p-4 flex flex-col items-center">
        <h2 className="text-black font-bold text-center">{title}</h2>
        <button
          onClick={toggleOpen}
          className="text-blue-500 mt-2 flex items-center justify-center"
        >
          <span className={`${isOpen ? "rotate-180" : ""}`}>▼</span>{" "}
          {/* Seta rotaciona */}
        </button>
      </div>
      {/* Acordeão para descrição e botões */}
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
  </div>
);

const Animacard = () => {
  const [openCards, setOpenCards] = useState({});

  const toggleCard = (id) => {
    setOpenCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {donations.map((donation) => (
        <Card
          key={donation.id}
          title={donation.title}
          image={donation.image}
          description={donation.description}
          isOpen={!!openCards[donation.id]}
          toggleOpen={() => toggleCard(donation.id)}
        />
      ))}
    </div>
  );
};

export default Animacard;
