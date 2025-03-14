import React from "react";
import Carousel from "react-bootstrap/Carousel";

const MainCarousel = () => {
  return (
    <div className="container-fluid">
      <Carousel>
        <Carousel.Item style={{ height: "300px" }}>
          <img
            style={{ height: "300px" }}
            className="d-block w-100"
            src={""}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First Demo</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item style={{ height: "300px" }}>
          <img
            style={{ height: "300px" }}
            className="d-block w-100"
            src={"src/assets/img/slide1.jpg"}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second Demo</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item style={{ height: "300px" }}>
          <img
            style={{ height: "300px" }}
            className="d-block w-100"
            src={"assets/img/img3.jpg"}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third Demo</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default MainCarousel;
