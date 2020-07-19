let debugCheckboxElement = document.getElementById('debug');
let IS_DEBUG = false;


debugCheckboxElement.addEventListener('change', () => IS_DEBUG = debugCheckboxElement.checked);
