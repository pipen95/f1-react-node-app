import NEW_STATS from "../types/newStats";
var parser = require("xml2json-light");

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

export const fetchStats = (stopLoading) => (dispatch) => {
  fetch("https://ergast.com/api/f1/current/driverStandings", requestOptions)
    .then((response) => response.text())
    .then((data) => {
      dispatch({
        type: NEW_STATS,
        stats: parser.xml2json(data),
      });
      stopLoading();
    })
    .catch((err) => console.log(err));
};
