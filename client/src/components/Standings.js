import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
function Results() {
  return (
    <div>
      <Container>
        <Jumbotron className="shadow">
          <Jumbotron className="bg-dark">
            <h1 className="header text-center color-white text-white">
              F1 driver live results
            </h1>
          </Jumbotron>
          <Jumbotron style={{ padding: 0 }}>
          <table class="table table-striped table-dark" style={{ borderRadius: 6}}>
  <thead >
    <tr>
      <th scope="col">Pos</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
          </Jumbotron>

        </Jumbotron>
      </Container>
    </div>
  );
}

export default Results;
