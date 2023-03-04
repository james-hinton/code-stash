import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.scss';

const Popup = () => {
  return (
    <div className="popup">
      <header className="popup-header">
        <img src={logo} className="popup-logo" alt="logo" />
      </header>
    </div>
  );
};

export default Popup;
