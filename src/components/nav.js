import React, { Component } from 'react';
import '../App.css';
import '../styling/nav.css'
import purdue from '../purduecampusarial.jpg';
import mapview from '../mapview.png';

import { Link } from 'react-router-dom'


require('bootstrap');


class Nav extends Component {
  render() {
    return (

        <nav className = "navbar  navbar-light bg-light">
        <div  className="navbar-collapse">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ad-left">
        <li className="nav-item">
         <div className="navbar-brand" > 
         <div>Polytechnic Institute</div>
         <div>Global Influence</div>
         </div>
        </li>
        </ul>
        <ul className="nav justify-content-end ad-right">
        
        <li className="nav-item img-wrap active">
        <Link  to={'/'}><img  className = "nav-link " src= {mapview} /></Link>
        </li>
        <li className="nav-item img-wrap">
        <Link  to={'/tree'}><img className = "nav-link " src= {purdue} /></Link>
        </li>
       
        
      </ul>
      </div>
      </nav>
    );
  }
}

export default Nav;