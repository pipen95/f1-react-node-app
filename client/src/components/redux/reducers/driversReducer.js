// import NEW_DRIVERS from '../types/newDrivers';
import NEW_STATS from '../types/newStats';
import NEW_VOTE from '../types/newVote';


const defaultState = {
  drivers: []
};

const driversReducer = (state = defaultState, action) => {
  switch (action.type) {
    case NEW_STATS:
      return {
        ...state,
        drivers: action.stats.MRData.StandingsTable.StandingsList.DriverStanding
      };

    case NEW_VOTE:
      console.log('I Voted');
      const i = action.i;
      const obj = state.drivers;
      return {
        ...state,
        drivers: [
          ...obj.slice(0, i), // before the one we are updating
          {
            ...obj[i],
            wins: Number(obj[i].wins) + 1
          },
          ...obj.slice(i + 1) // after the one we are updating
        ]
      };

    default:
      return state;
  }
};

export default driversReducer;