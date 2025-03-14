import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-links">
          {/* Cột 1 */}
          <Col md={3} sm={6}>
            <h5>Buy</h5>
            <ul>
              <li>Registration</li>
              <li>eBay Money Back Guarantee</li>
              <li>Bidding & Buying Help</li>
              <li>Stores</li>
              <li>eBay Local</li>
              <li>eBay Guides</li>
            </ul>
          </Col>

          {/* Cột 2 */}
          <Col md={3} sm={6}>
            <h5>Sell</h5>
            <ul>
              <li>Start Selling</li>
              <li>Learn to Sell</li>
              <li>Business Sellers</li>
              <li>Affiliates</li>
            </ul>
          </Col>

          {/* Cột 3 */}
          <Col md={3} sm={6}>
            <h5>Tools & Apps</h5>
            <ul>
              <li>Developers</li>
              <li>Security Center</li>
              <li>eBay Official Time</li>
              <li>Site Map</li>
            </ul>
          </Col>

          {/* Cột 4 */}
          <Col md={3} sm={6}>
            <h5>Stay Connected</h5>
            <ul className="social-icons">
              <li>
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </li>
              <li>
                <FontAwesomeIcon icon={faTwitter} /> Twitter
              </li>
              <li>
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </li>
            </ul>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="text-center mt-4">
          <Col>
            <p className="copyright-text">
              Copyright © 1995-2025 eBay Inc. All Rights Reserved.  
              <a href="#"> User Agreement</a>,  
              <a href="#"> Privacy</a>,  
              <a href="#"> Cookies</a>,  
              <a href="#"> Do not sell my personal information</a>.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
