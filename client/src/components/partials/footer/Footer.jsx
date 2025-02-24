import { Container, Row, Col } from "react-bootstrap";
import ButtonCookie from "../../CookiesButton";

import "./Footer.css";

const Footer = () => {
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <p className="footer-text">
            Designed and Developed by{" "}
            <a
              href="https://github.com/xanbalandrau/Portfolio"
              target="_blank"
              className="footer-link"
            >
              Xan
            </a>
          </p>
        </Col>
        <Col md="4" className="footer-copywright">
          <p className="footer-text">Copyright © 2025 XB</p>
        </Col>
        <Col md="4" style={{ textAlign: "center" }}>
          <ButtonCookie />
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
