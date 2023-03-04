export async function searchBasicCode(tabId) {
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
        const codeElement = codeBlocks[i].outerHTML;
        const language = 'unknown';
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
