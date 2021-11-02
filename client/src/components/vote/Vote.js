import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import CardList from "./CardList";
import { Provider } from "react-redux";
import store from "../redux/store/store";

function Vote() {
  return (
    <div>
      <Provider store={store}>
        <Container>
          <Jumbotron className="shadow">
            <Jumbotron className="bg-dark">
              <h1 className="header text-center color-white text-white mb-0">
                Rate your favorite F1&nbsp;driver!
              </h1>
              <div className="loader-container">
                <div className="loader"></div>
              </div>
              <CardList />
            </Jumbotron>
          </Jumbotron>
        </Container>
      </Provider>
    </div>
  );
}

export default Vote;
