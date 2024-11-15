import React from "react";
import Slider from "react-slick";
import Header from "./header";
import { useLocation, useParams } from "react-router-dom";

const Dados = () => {
  const { productName } = useParams();
  const location = useLocation();
  const productData = location.state;

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
    <div>
      <Header />
      <div className="bg-gray-300 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl w-full bg-white p-8 shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row items-start justify-between space-y-8 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-1/2 mr-4 mb-4 md:mb-0">
              <Slider {...settings}>
                {[...Array(5)].map((_, index) => (
                  <div key={index}>
                    <img
                      src={productData.image || `https://placehold.co/400x600`}
                      alt={`Imagem ${index + 1}`}
                      className="h-[624px] w-full object-cover rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="w-full md:w-1/2 space-y-8">
              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-2">
                  Título do Produto
                </label>
                <input
                  defaultValue={productData.title}
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-2">
                  Descrição do Produto
                </label>
                <textarea
                  defaultValue={productData.description}
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
                  defaultValue={productData.location}
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
