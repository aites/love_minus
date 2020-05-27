import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();
export const store = createStore(
  createRootReducer(history),
  compose(applyMiddleware(routerMiddleware(history), thunk, logger))
);
