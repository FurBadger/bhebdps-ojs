const editor = document.getElementById('editor');
const clearButton = document.getElementById('clear-button');
const storageKey = 'editorText';

function saveEditorText() {
  localStorage.setItem(storageKey, editor.value);
}

function restoreEditorText() {
  const savedText = localStorage.getItem(storageKey);

  if (savedText === null) {
    return;
  }

  editor.value = savedText;
}

function clearEditorText() {
  editor.value = '';
  localStorage.removeItem(storageKey);
}

function initEditor() {
  restoreEditorText();
  editor.addEventListener('input', saveEditorText);
  clearButton.addEventListener('click', clearEditorText);
}

initEditor();