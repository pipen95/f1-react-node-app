import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import CardList from "./components/CardList";
import { Provider } from "react-redux";
import store from "./components/redux/store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-country-select/dist/react-bootstrap-country-select.css";

const App = () => {
  return (
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
  );
};
export default App;
