import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import MapArea from "./MapArea";
function Map() {
  return (
    <div>
      <Container>
        <Jumbotron className="shadow">
          <Jumbotron className="bg-dark">
            <h1 className="header text-center color-white text-white mb-0">
              F1 fans from around the word
            </h1>
            <MapArea />
          </Jumbotron>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default Map;
