import React, { Component } from 'react';
import './App.css';
import Games from './Games';
import Header from './Header';

class App extends Component {
  constructor() {
    super();
    this.state = {
      games: [{
        name: 'default game name', _id: '99999999', p1: [1, 1, 1], p2: [2, 2, 2],
      }],
    };
  }

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  loadCommentsFromServer = () => {
    fetch('v1/rps-games')
      .then(data => data.json())
      .then((res) => {
        this.setState({ games: res });
      });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Games games={this.state.games} />
      </div>
    );
  }
}

export default App;
