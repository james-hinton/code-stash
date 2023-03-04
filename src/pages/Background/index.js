chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'LOG_MESSAGE') {
      console.log(message.message);
    }
  });