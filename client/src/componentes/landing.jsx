import "../index.css";
import Header from "./header.jsx";
import Dados from "./dados.jsx";
import React from "react";
import Slider from "react-slick";
import imagem1 from "../assets/imagem1.jpg";
import imagem2 from "../assets/imagem2.jpg";
import Card from "./card_produto.jsx";

const slides = [
  {
    image: imagem1,
    title: "Simple Donations",
    description:
      "Aqui na Simple Donations, as suas doações ficam muito mais fáceis.",
  },
  {
    image: imagem2,
    title: "Crie a sua conta e realize a sua doação!",
    description:
      "Aqui no *nome da empresa* você pode doar/receber doações de uma maneira muito mais fácil.",
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
    autoplaySpeed: 8000,
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
        <div className="bg-white text-black shadow-md p-6 rounded-md max-w-xl mx-auto">
          <h2 className="text-xl font-semibold">Título 1</h2>
          <p className="mt-2 text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam
            culpa quas magni fugiat sapiente iusto atque quae, at obcaecati
            placeat ipsum aliquam ipsa, impedit animi delectus aperiam
            inventore. Voluptate, dignissimos.
          </p>
        </div>
        <div className="bg-white text-black shadow-md p-6 rounded-md max-w-xl mx-auto">
          <h2 className="text-xl font-semibold">Título 2</h2>
          <p className="mt-2 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            accusamus voluptatibus dicta, quam velit nisi soluta, recusandae
            aliquid nostrum voluptas, aut quia. Placeat corporis incidunt
            similique hic ullam culpa earum.
          </p>
        </div>
        <div className="bg-white text-black shadow-md p-6 rounded-md max-w-xl mx-auto">
          <h2 className="text-xl font-semibold">Título 3</h2>
          <p className="mt-2 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            mollitia odio suscipit dolores ullam. Aut consequuntur iusto
            asperiores explicabo accusamus cumque autem, similique eos non,
            exercitationem ea nulla expedita at.
          </p>
        </div>
        <div className="bg-white text-black shadow-md p-6 rounded-md max-w-xl mx-auto">
          <h2 className="text-xl font-semibold">Título 4</h2>
          <p className="mt-2 text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
            earum, quaerat qui accusantium molestias animi voluptatibus
            consequuntur nam possimus incidunt ea maiores nostrum provident cum
            quod nisi enim eligendi! Voluptatum!
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-center my-4">
          <div className="flex-grow h-1 bg-gray-300" />
          <span className="mx-4 font-semibold text-gray-500">
            Cards (Placeholder)
          </span>
          <div className="flex-grow h-1 bg-gray-300" />
        </div>
        <Card />
      </div>
      <div className="flex items-center my-4">
        <div className="flex-grow h-1 bg-gray-300" />
        <span className="mx-4 font-semibold text-gray-500">
          Página informações (Placeholder)
        </span>
        <div className="flex-grow h-1 bg-gray-300" />
      </div>
      <div>
        <Dados />
      </div>
    </div>
  );
};

export default Landing;
