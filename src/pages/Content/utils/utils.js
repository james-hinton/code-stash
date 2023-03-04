export function addSaveButtonOnHover(codeBlock) {
  if (!codeBlock) {
    console.error('Invalid code block:', codeBlock);
    return;
  }

  console.log('Adding save button for code block:', codeBlock);

  codeBlock.addEventListener('mouseenter', function (event) {
    const target = event.target;
    if (!target) {
      console.error('Invalid target element:', target);
      return;
    }
    target.style.position = 'relative';
    const saveButton = document.createElement('button');
    saveButton.innerHTML = 'Save';
    saveButton.style.position = 'absolute';
    saveButton.style.right = '0';
    saveButton.style.bottom = '0';
    saveButton.style.zIndex = '1000';
    target.appendChild(saveButton);
  });

  codeBlock.addEventListener('mouseleave', function (event) {
    const target = event.target;
    if (!target) {
      console.error('Invalid target element:', target);
      return;
    }
    target.style.position = '';
    const saveButton = target.querySelector('button');
    if (saveButton) {
      target.removeChild(saveButton);
    }
  });
}
