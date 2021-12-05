import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-country-select/dist/react-bootstrap-country-select.css";
import { Route, Switch } from "react-router-dom";
import Vote from "./components/vote/Vote";
import Leaderboard from "./components/home/Leaderboard";
import Map from "./components/map/Map";

import Menu from "./components/nav/Menu";

const App = () => {
  return (
    <div className="App">
      <Menu />
      <Switch>
        <Route path="/vote">
          <Vote />
        </Route>
        <Route path="/map">
          <Map />
        </Route>
        <Route path="/" exact>
          <Leaderboard />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
