import {
  searchStackOverflowCode,
  isStackOverflowPage,
} from './sites/stackoverflow.js';
import { searchBasicCode } from './sites/basic.js';

export function searchCode() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0].id;
    const url = new URL(tabs[0].url);
    chrome.runtime.sendMessage({
      type: 'LOG_MESSAGE',
      message: `Searching code on ${url.hostname}`,
    });

    if (isStackOverflowPage()) {
      searchStackOverflowCode(tabId);
    } else {
      searchBasicCode(tabId);
    }
  });
}
