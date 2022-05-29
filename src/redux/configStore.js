// configStore.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import vocabulary from './modules/vocabulary';

const middlewares = [thunk];

// reducer 묶어주기
// store는 총 1개, riducer의 개수는 제한이 없다.
const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({ vocabulary });
const store = createStore(rootReducer, enhancer);

export default store;
