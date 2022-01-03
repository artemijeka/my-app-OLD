import {createStore, combineReducers} from 'redux';

function tasksReducer() {
  return true;
}

let reducers = combineReducers({
  tasks: tasksReducer,
});

let store = createStore(reducers);

export default store;