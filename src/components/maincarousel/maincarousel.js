import React from "react";
import Carousel from "react-bootstrap/Carousel";

const MainCarousel = () => {
  return (
    <div className="container-fluid">
      <Carousel>
        <Carousel.Item style={{ height: "300px" , width:"90%" , paddingTop: "30px", marginLeft: "5%"}}>
          <img
            style={{ height: "300px" }}
            className="d-block w-100"
            src={"/bg.png"}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First Demo</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item style={{  height: "300px" , width:"90%" , paddingTop: "30px", marginLeft: "5%" }}>
          <img
            style={{ height: "300px" }}
            className="d-block w-100"
            src={"/slide1.jpg"}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second Demo</h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item style={{  height: "300px" , width:"90%" , paddingTop: "30px", marginLeft: "5%" }}>
          <img
            style={{ height: "300px" }}
            className="d-block w-100"
            src={"/slide3.png"}
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
