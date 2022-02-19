import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import ModalContainer from "./modal/ModalContainer";

const Menu = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" className="">
        <Container>
          <Container
            className="justify-content-start flex-nowrap"
            style={{ marginLeft: "2.4vw" }}
          >
            <Navbar.Brand href="/">F1 Bistrot</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/standings">Standings</Nav.Link>
            </Nav>
            <Nav className="me-auto">
              <Nav.Link href="/vote">Game</Nav.Link>
            </Nav>
          </Container>
          <Container
            className="justify-content-end flex-nowrap"
            style={{ marginRight: "2.3vw" }}
          >
            <Nav className="me-auto">
            <ModalContainer triggerText="Login" path="login"/>
            </Nav>
            <Nav className="me-auto">
            <ModalContainer triggerText="Sign up" path="signup"/>
            </Nav>
          </Container>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
