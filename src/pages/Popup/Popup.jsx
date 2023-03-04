import React, { useState, useEffect } from 'react';
import './Popup.scss';

const Popup = () => {
  const [code, setCode] = useState([]);

  function searchCode() {
    chrome.runtime.sendMessage({ type: 'LOG_MESSAGE', message: 'Searching for code' });
  
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: function () {
          const codeBlocks = document.getElementsByTagName('code');
          const codeTexts = [];
          for (let i = 0; i < codeBlocks.length; i++) {
            codeBlocks[i].style.border = '3px solid blue';
            codeTexts.push(codeBlocks[i].outerHTML);
          }
          return codeTexts;
        },
      }).then(function (result) {
        console.log('Code blocks:', result[0]);
        chrome.runtime.sendMessage({ type: 'LOG_MESSAGE', message: 'Code blocks found' });
        chrome.runtime.sendMessage({ type: 'LOG_MESSAGE', message: result[0].result });
      });
    });
  }
  
  

  const handleClick = () => {
    chrome.runtime.sendMessage({ type: 'LOG_MESSAGE', message: 'Testing the button' });
  };

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
