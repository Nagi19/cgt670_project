import React, { Component } from 'react';
import '../App.css';
import WorldMap from "../maps/worldMap.js";

class Home extends Component {
  render() {
    return (
        <div>        
        <WorldMap/>
      </div>
    );
  }
}

export default Home;