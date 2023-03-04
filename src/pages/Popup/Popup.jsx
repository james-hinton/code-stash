import React, { useState, useEffect } from 'react';
import './Popup.scss';

const Popup = () => {
  const [code, setCode] = useState([]);

  async function searchCode() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = new URL(tabs[0].url);
    let searchFunction = null;
  
    if (url.hostname === 'stackoverflow.com') {
      searchFunction = searchStackOverflowCode;
    } else {
      searchFunction = searchBasicCode;
    }
  
    const codeBlocks = await searchFunction(tabs[0].id);
    console.log('Code blocks:', codeBlocks);
    chrome.runtime.sendMessage({ type: 'LOG_MESSAGE', message: 'Code blocks found' });
    chrome.runtime.sendMessage({ type: 'LOG_MESSAGE', message: codeBlocks });
  }
  
  async function searchBasicCode(tabId) {
    chrome.runtime.sendMessage({
      type: 'LOG_MESSAGE',
      message: 'Searching Basic!',
    });
  
    const result = await chrome.scripting.executeScript({
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
    });
    
    return result[0].result;
  }
  
  async function searchStackOverflowCode(tabId) {
    chrome.runtime.sendMessage({
      type: 'LOG_MESSAGE',
      message: 'Running on stack overflow',
    });
  
    const result = await chrome.scripting.executeScript({
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
    });
    
    return result[0].result;
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
