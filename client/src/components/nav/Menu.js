import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

const Menu = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" className="">
        <Container>
          <Container
            className="justify-content-start flex-nowrap"
            style={{ marginLeft: "2.4vw" }}
          >
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/results">Results</Nav.Link>
            </Nav>
            <Nav className="me-auto">
              <Nav.Link href="/vote">Vote</Nav.Link>
            </Nav>
            <Nav className="me-auto">
              <Nav.Link href="/map">Map</Nav.Link>
            </Nav>
          </Container>
          <Container
            className="justify-content-end flex-nowrap"
            style={{ marginRight: "2.3vw" }}
          >
            <Nav className="me-auto">
              <Nav.Link href="#">Login</Nav.Link>
            </Nav>
            <Nav className="me-auto">
              <Nav.Link href="#">Sign up</Nav.Link>
            </Nav>
          </Container>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
