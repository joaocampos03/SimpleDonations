// src/componentes/NewComponent.jsx
import React from "react";
import Slider from "react-slick";

const NewComponent = () => {
  const productData = {
    title: "Título do Produto",
    description: "Descrição do Produto",
    status: "Doado",
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: true,
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-between p-8">
      <div className="w-full md:w-1/2 mr-4 mb-4 md:mb-0">
        <Slider {...settings}>
          {[...Array(5)].map((_, index) => (
            <div key={index}>
              <img
                src={`https://placehold.co/400x600`}
                alt={`Imagem ${index + 1}`}
                className="h-[624px] w-full object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="w-full md:w-1/2 space-y-8">
        <div className="flex flex-col">
          <label htmlFor="product-title" className="text-lg font-semibold mb-2">
            Título do Produto
          </label>
          <input
            id="product-title"
            defaultValue={productData.title}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            readOnly
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="product-description"
            className="text-lg font-semibold mb-2"
          >
            Descrição do Produto
          </label>
          <textarea
            id="product-description"
            defaultValue={productData.description}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-none h-24"
            readOnly
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="product-status"
            className="text-lg font-semibold mb-2"
          >
            Status do Produto
          </label>
          <input
            id="product-status"
            defaultValue={productData.status}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            readOnly
          />
        </div>
        <button className="bg-blue-500 text-white rounded-lg p-3 w-full hover:bg-blue-600 transition duration-200">
          Tela inicial
        </button>
      </div>
    </div>
  );
};

export default NewComponent;
