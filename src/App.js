import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WorldMap from "./maps/worldMap.js";

import Nav from './components/nav';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Nav/>
      <WorldMap/>
        <header className="App-header">
         

        </header>
      </div>
    );
  }
}

export default App;
