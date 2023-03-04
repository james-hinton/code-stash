import React, { useState, useEffect } from 'react';
import './Popup.scss';

const Popup = () => {
  const [code, setCode] = useState([]);

  function searchCode() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = new URL(tabs[0].url);
      let searchFunction = null;

      if (url.hostname === 'stackoverflow.com') {
        searchFunction = searchStackOverflowCode;
      } else {
        searchFunction = searchBasicCode;
      }

      searchFunction(tabs[0].id);
    });
  }

  function searchBasicCode(tabId) {
    chrome.runtime.sendMessage({
      type: 'LOG_MESSAGE',
      message: 'Searching Basic!',
    });

    chrome.scripting
      .executeScript({
        target: { tabId },
        function: function () {
          const codeBlocks = document.getElementsByTagName('code');
          const codeTexts = [];
          for (let i = 0; i < codeBlocks.length; i++) {
            codeBlocks[i].style.border = '3px solid blue';
            codeTexts.push(codeBlocks[i].outerHTML);
          }
          return codeTexts;
        },
      })
      .then(function (result) {
        chrome.runtime.sendMessage({ type: 'LOG_MESSAGE', message: result });
      });
  }

  function searchStackOverflowCode(tabId) {
    chrome.runtime.sendMessage({
      type: 'LOG_MESSAGE',
      message: 'Running on stack overflow',
    });

    chrome.scripting
      .executeScript({
        target: { tabId },
        function: function () {
          const codeBlocks = document.querySelectorAll('.s-code-block');
          const codeTexts = [];
          for (let i = 0; i < codeBlocks.length; i++) {
            codeBlocks[i].style.border = '3px solid blue';
            const codeElement = codeBlocks[i].getElementsByTagName('code')[0];
            const language = 'unknown'
            codeTexts.push({
              language,
              code: codeElement.innerText,
            });
          }
          return codeTexts;
        },
      })
      .then(function (result) {
        chrome.runtime.sendMessage({
          type: 'LOG_MESSAGE',
          message: result[0].result,
        });
      });
  }

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
