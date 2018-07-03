import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import rootReducer, { DEFAULT_STATE } from './reducers';
import rootSaga from './sagas';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Homepage from './pages/Homepage';
import Game from './pages/Game';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer, DEFAULT_STATE,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/game/:id" component={Game} />
      </div>
    </Router>
  </Provider>, document.getElementById('root')
);

registerServiceWorker();
