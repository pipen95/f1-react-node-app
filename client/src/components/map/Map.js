import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
function Map() {
  return (
    <div>
      <Container>
        <Jumbotron className="shadow">
          <Jumbotron className="bg-dark">
            <h1 className="header text-center color-white text-white mb-0">
              Where are F1 fans voting from ?
            </h1>
          </Jumbotron>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default Map;