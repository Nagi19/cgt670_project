import React, { Component } from 'react';
import '../App.css';
import Iframe from 'react-iframe'

class Tree extends Component {
  render() {
    return (
        <div>        
        <Iframe url="http://localhost:8000/2wayTree/index.html"
            position="absolute"
            width="100%"
            id="chart"
            className="chart"
            height="100%"
            allowFullScreen/>
      </div>
    );
  }
}

export default Tree;