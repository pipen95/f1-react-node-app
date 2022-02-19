import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from '../redux/store/store';

import Table from './Table';
function Standings() {
  return (
    <div>
      <Provider store={store}>
        <Container>
          <Jumbotron className="shadow">
            <Jumbotron className="bg-dark">
              <h1 className="header text-center color-white text-white">
                Season {new Date().getFullYear()} standings
              </h1>
            </Jumbotron>
            <Jumbotron style={{ paddingLeft: '20vw', paddingRight:'20vw'}}>
              <Table />
            </Jumbotron>
          </Jumbotron>
        </Container>
      </Provider>
    </div>
  );
}

export default Standings;
