import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import './FooterStyle.css'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="footer-content">Copyright &copy; Cafe Site</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
