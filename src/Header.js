import React, { Component } from 'react';
import "./index.scss" 
//imported dependecies.

class Header extends Component {
  render() {
    return (
      /* the header and logo is displayed within this components 
      */
      <div className="header" >
        <div className='logo'>
        <img src={require('./logo.png')} height={200}  width={200}/>
        </div>
        <h1 className="title" > LH Medical Company</h1>
        <h2>Patient Managment Sytem</h2>
      </div>
    );
  }
}

export default Header