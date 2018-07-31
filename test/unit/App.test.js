import React from 'react';
import ReactDOM from 'react-dom';
import GamesList from '../../src/containers/GamesList';
import Game from '../../src/containers/Game';

it('renders GamesList without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GamesList />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Game without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game />, div);
  ReactDOM.unmountComponentAtNode(div);
});
