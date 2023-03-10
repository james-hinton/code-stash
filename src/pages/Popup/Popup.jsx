import React, { useState } from 'react';
import './Popup.scss';

import { searchCode } from '../Content/search';

const Popup = () => {
  const [code, setCode] = useState([]);

  return (
    <div className="popup">
      <header className="popup-header">
        <h3>Code Stash</h3>
      </header>
      <div className="popup-content">
        <p>Code found on this pagesss</p>
        <button onClick={searchCode}>Log to console</button>
      </div>
    </div>
  );
};

export default Popup;
