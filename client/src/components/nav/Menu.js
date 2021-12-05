import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

const Menu = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" className="">
        <Container className="justify-content-start">
          <Navbar.Brand href="/" className="ml-5">
            Fast Fans
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/vote">Vote</Nav.Link>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link href="/map">Map</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
