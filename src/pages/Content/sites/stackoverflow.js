import { addSaveButtonOnHover } from '../utils/utils.js';

export async function searchStackOverflowCode() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabId = tabs[0].id;
  
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
        const language = 'unknown';
        codeTexts.push({
          language,
          code: codeElement.innerText,
        });
        // addSaveButtonOnHover(codeBlocks[i]);
      }
      return codeTexts;
    },
  });

  return result[0].result;
}


export async function isStackOverflowPage() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tabs[0].url);
  chrome.runtime.sendMessage({
    type: 'LOG_MESSAGE',
    message: 'Checking if stack overflow page ' + url.hostname,
  });

  return url.hostname === 'stackoverflow.com';
}
