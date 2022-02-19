import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-country-select/dist/react-bootstrap-country-select.css";
import { Route,Routes} from "react-router-dom";
import Vote from "./components/vote/Vote";
import Standings from "./components/standings/Standings";
import Home from "./components/Home";
import Menu from "./components/Menu";

const App = () => {
  return (
    <div className="App">
      <Menu />
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/standings" element={<Standings />} />
          <Route exact path="/vote" element={<Vote />} />
        </Routes>
    </div>
  );
};
export default App;
