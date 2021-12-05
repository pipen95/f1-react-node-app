import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
function Leaderboard() {
  return (
    <div>
      <Container>
        <Jumbotron className="shadow">
          <Jumbotron className="bg-dark">
            <h1 className="header text-center color-white text-white mb-0">
              F1 driver leaderboard
            </h1>
          </Jumbotron>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default Leaderboard;
