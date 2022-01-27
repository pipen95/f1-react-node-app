import React from "react";
import { Container, Jumbotron, Button } from "react-bootstrap";
function Home() {
  return (
    <div>
      <Container>
        <Jumbotron className="shadow">
          <Jumbotron className="bg-dark">
            <h1 className="header text-center color-white text-white mb-2">
              Welcome to Bistrot F1
            </h1>

            <p className="color-white text-white text-center mb-4">
              A place for the f1 community to rate drivers, place bets and more!
            </p>

            <div className="text-center">
              <Button variant="primary mr-3 mb-3" size="lg" href="/vote">
                Rate drivers
              </Button>
              <Button
                variant="outline-success mr-3 mb-3"
                size="lg"
                href="/results"
              >
                Check Live Leaderboard
              </Button>
              <Button variant="outline-warning mb-3" size="lg" href="/map">
                View fans world map
              </Button>
            </div>
          </Jumbotron>
        </Jumbotron>
      </Container>
    </div>
  );
}

export default Home;
