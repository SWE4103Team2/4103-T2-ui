import React from 'react';
import logo from '../../assets/unb.jpg'

const Header = () => {
  return (
    <div className="header" >
      <img src={logo} alt="" height="75px" className="logo" />
      <p className="title"> SWE4103 Team 2 </p>
    </div>
  );
}

export default Header;