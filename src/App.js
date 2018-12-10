import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'


import Nav from './components/nav';
import Home from './components/home';
import Tree from './components/tree';

import './App.css';
import "./styling/home.css";

class App extends Component {
  render() {
    return (


      <HashRouter>

      <div className="App">
             <Nav/>
       <div class="container-fluid">
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/Tree' component={Tree}/>
       </Switch>
       
      </div></div>
      </HashRouter>
    );
  }
}

export default App;
