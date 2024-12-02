import "../index.css";
import Header from "./header.jsx";
import React from "react";
import Slider from "react-slick";
import imagem1 from "../assets/imagem1.jpg";
import imagem3 from "../assets/imagem3.jpg";

const slides = [
  {
    image: imagem3,
    title: "Simple Donations",
    description:
      "Aqui na Simple Donations, as suas doações ficam muito mais fáceis.",
  },
  {
    image: imagem1,
    title: "Crie a sua conta e realize a sua doação!",
    description:
      "Na Simple Donations você pode doar/receber doações de uma maneira rápida e fácil.",
  },
];

const Landing = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 cursor-pointer text-white text-2xl"
        onClick={onClick}
      >
        &#10095;
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 cursor-pointer text-white text-2xl"
        onClick={onClick}
      >
        &#10094;
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="h-screen relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center p-8">
                <h1 className="text-4xl font-extrabold">{slide.title}</h1>
                <p className="mt-4 text-lg">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className="flex items-center my-4">
        <div className="flex-grow h-1 bg-gray-300" />
        <span className="mx-4 font-semibold text-gray-500">Informações</span>
        <div className="flex-grow h-1 bg-gray-300" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
        <div className="bg-white text-black shadow-md p-6 rounded-md max-w-xl mx-auto">
          <h2 className="text-xl font-semibold">Faça sua Doação</h2>
          <p className="mt-2 text-center">
            Doe com facilidade e transparência! Aqui você pode oferecer produtos
            ou recursos para quem mais precisa. Cada doação faz a diferença.
          </p>
        </div>
        <div className="bg-white text-black shadow-md p-6 rounded-md max-w-xl mx-auto">
          <h2 className="text-xl font-semibold">Encontre o que Precisa</h2>
          <p className="mt-2 text-center">
            Busque por itens essenciais disponibilizados por doadores. Nossa
            plataforma conecta quem doa e quem precisa de forma prática.
          </p>
        </div>
        <div className="bg-white text-black shadow-md p-6 rounded-md max-w-xl mx-auto">
          <h2 className="text-xl font-semibold">Acompanhe suas Doações</h2>
          <p className="mt-2 text-center">
            Visualize e gerencie o status das suas doações. Tenha controle total
            sobre o que já foi doado ou ainda está disponível.
          </p>
        </div>
        <div className="bg-white text-black shadow-md p-6 rounded-md max-w-xl mx-auto">
          <h2 className="text-xl font-semibold">Segurança e Simplicidade</h2>
          <p className="mt-2 text-center">
            Utilizamos tecnologia avançada para garantir uma experiência
            confiável e acessível para todos. Doe ou receba com tranquilidade!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
