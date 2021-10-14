import { combineReducers } from 'redux';
import driversReducer from './driversReducer';

const rootReducer = combineReducers({
  drivers: driversReducer,

});

export default rootReducer;
