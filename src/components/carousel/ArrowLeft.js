import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

const ArrowLeft = ({ goToNextSlide }) => {
  return (
    <div className="forwardArrow" onClick={goToNextSlide}>
      <FontAwesomeIcon icon={faChevronCircleLeft} />
    </div>
  );
};

export default ArrowLeft;
