import React, { useState, useEffect } from "react";
import "./CSS/main.css";
import photo from "../assets/photos/WhatsApp Image 2024-10-12 at 14.47.40_4f9cd0ae.jpg";

const Main = () => {
  const messages = ["Individuality", "Creative Spark", "Imagination"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="main-content">
     
      <img src={photo} alt="Artistic representation" className="image" />
      <div className="overlay"></div>
      <div className="content__container">
        <h1 className="content__container__text">Embrace Your</h1>
        <ul className={`content__container__list`}>
          <li className="content__container__list__item">{messages[index]}</li>
        </ul>
      </div>
    </div>
  );
};

export default Main;
