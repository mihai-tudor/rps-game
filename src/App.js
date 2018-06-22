import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
      error: null,
    };
  }

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  loadCommentsFromServer = () => {
    fetch('v1/rps-games')
      .then(data => data.json())
      .then((res) => {
        this.setState({ data: res });
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React, my react!</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          {JSON.stringify(this.state.data)}
          {JSON.stringify(this.state.error)}
        </p>
      </div>
    );
  }
}

export default App;
