import React from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from "react-router-dom";
import Logo from '../../assets/logo.png'
import './Header.css';

const Header = ({history}) => {
  const handleHome = () => {
    history.push('/');
  }

  const handleClick = () => {
    history.push('/addarticle');
  }

  return(
    <div className="header-container">
      <div className="logo-name" onClick={handleHome}>
        <img src={Logo}/>
        <h1>readible</h1>
      </div>
      <button className="add-btn" onClick={handleClick}>
        <i className="fa fa-plus"></i>
        <span className="btn-text">Add article</span>
      </button>
    </div>
  )
}

export default withRouter(Header);
