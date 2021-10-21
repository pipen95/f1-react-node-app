// import NEW_DRIVERS from '../types/newDrivers';
import NEW_STATS from "../types/types";

const defaultState = {
  drivers: [],
};

const driversReducer = (state = defaultState, action) => {
  switch (action.type) {
    case NEW_STATS:
      return {
        ...state,
        drivers:
          action.stats.MRData.StandingsTable.StandingsList.DriverStanding,
      };

    default:
      return state;
  }
};

export default driversReducer;
