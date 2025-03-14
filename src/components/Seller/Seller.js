import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Seller.css";


function Seller() {
  return (
    <div className="seller">
      {/* Top Section */}
      <Container fluid className="top-section py-5">
        <Row className="align-items-center">
          <Col md={6} className="text-white text-center text-md-start">
            <h2 className="top-card-title">Eyes Off These</h2>
            <p>Discover the top watched items on eBay</p>
            <Button variant="light" className="custom-btn">
              Watch Out <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </Col>
          <Col md={6}>
            <Image src="/anh1.jpg" id="img" fluid className="rounded shadow-lg" />
          </Col>
        </Row>
      </Container>

      {/* Middle Section */}
      <Container fluid className="middle-section text-center py-5">
        <div className="middle-stars">⭐⭐⭐⭐⭐</div>
        <div className="middle-text">"Your opinion matters! Help us improve."</div>
        <Button variant="warning" className="custom-btn mt-3">
          Take the Survey <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </Container>

      {/* Bottom Section */}
      <Container fluid className="bottom-section py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <Image src="/anh2.jpg" id="img" fluid className="rounded shadow-lg" />
          </Col>
          <Col md={6} className="text-white text-center text-md-start">
            <h2 className="bottom-card-title">Shopping Made Easier, Since 1995</h2>
            <p>The eBay App makes it easier to search, buy, and sell on the go.</p>
            <Button variant="light" className="custom-btn">
              Download the App <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Seller;
