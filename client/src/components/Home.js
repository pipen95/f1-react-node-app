import React from "react";
import { Container, Jumbotron, Button } from "react-bootstrap";
import Map from "./Map"
function Home() {
  return (
    <div>
      <Container>
        <Jumbotron className="shadow">
          <Jumbotron className="bg-dark">
            <h1 className="header text-center color-white text-white mb-2">
              Welcome to F1 Bistrot 
            </h1>

            <p className="color-white text-white text-center mb-4">
              The F1 community rendez-vous !
            </p>

            <div className="text-center">
              <Button variant="primary mr-3 mb-3" size="lg" href="/vote">
                Play games
              </Button>
              <Button
                variant="outline-success mr-3 mb-3"
                size="lg"
                href="/standings"
              >
                Check Live Standings
              </Button>
            </div>
            <Map/>
          </Jumbotron>

        </Jumbotron>
      </Container>
    </div>
  );
}

export default Home;
