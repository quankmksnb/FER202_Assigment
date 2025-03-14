import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

const ArrowRight = ({ goToNextSlide }) => {
  return (
    <div className="forwardArrow" onClick={goToNextSlide}>
      <FontAwesomeIcon icon={faChevronCircleRight} />
    </div>
  );
};

export default ArrowRight;
