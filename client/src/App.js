import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-country-select/dist/react-bootstrap-country-select.css";
import { Route } from "react-router-dom";
import Vote from "./components/vote/Vote";
import Map from "./components/map/Map";
import Menu from "./components/nav/Menu";

const App = () => {
  return (
    <div className="App">
      <Menu />
      <Route path="/vote">
        <Vote />
      </Route>
      <Route path="/">
        <Map />
      </Route>
    </div>
  );
};
export default App;
