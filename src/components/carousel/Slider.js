import React, { useState } from "react";
import SliderContent from "./SliderContent";
import Data from "../constant/data";
import "./content.css";
import ArrowRight from "./ArrowRight";
import ArrowLeft from "./ArrowLeft";

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const length = Data.length;

  const goToPrevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex < 1 ? length - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="slider">
      <div className="slider-items">
        <div className="arrow-left">
          <ArrowLeft goToNextSlide={goToPrevSlide} />
        </div>
        <div id="slider-content">
          <SliderContent activeIndex={activeIndex} />
        </div>
        <div className="arrow-right">
          <ArrowRight goToNextSlide={goToNextSlide} />
        </div>
      </div>
    </div>
  );
};

export default Slider;
