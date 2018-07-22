import React from 'react';
import ReactDOM from 'react-dom';
import GamesList from '../../src/containers/GamesList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GamesList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
