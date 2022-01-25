import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
function Results() {
  return (
    <div>
      <Container>
        <Jumbotron className="shadow">
          <Jumbotron className="bg-dark">
            <h1 className="header text-center color-white text-white mb-2">
              F1 driver live results / F1 fans leaderboard
            </h1>
          </Jumbotron>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default Results;
