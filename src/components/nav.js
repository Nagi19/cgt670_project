import React, { Component } from 'react';
import '../App.css';
import '../styling/nav.css'
require('bootstrap');


class Nav extends Component {
  render() {
    return (

        <nav className = "navbar  navbar-light bg-light">
        <div  className="navbar-collapse">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ad-left">
        <li className="nav-item">
         <div className="navbar-brand" >Purdue University Global Influence</div>
        </li>
        </ul>
        <ul className="nav justify-content-end ad-right">
        <li className="nav-item">
          <a className="nav-link active" href="#">Active</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
      </div>
      </nav>
    );
  }
}

export default Nav;