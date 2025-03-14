import React from "react";
import "./content.css";
import Data from "../constant/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SliderContent = ({ activeIndex }) => {
  return (
    <section className="container">
      {Data.map((s, index) => (
        <div
          className={`slider-item ${index === activeIndex ? "active" : "inactive"}`}
          key={index}
        >
          <div className="slider-card" >
            <h2 className="card-title">{s.title}</h2>
            <p>{s.desc}</p>
            <button type="button">
              {s.button} <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <img src={s.imgUrl} id="img" alt={s.title} />
        </div>
      ))}
    </section>
  );
};

export default SliderContent;
