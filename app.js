const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.keyboard-container');

const wordle = "SUPER";

const keys = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'ENTER',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  '«'
]

const guessRows = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
]

let currentRow = 0;
let currentTile = 0;

guessRows.forEach((guessRow, guessRowIndex) => {
  const rowElement = document.createElement('div');
  rowElement.setAttribute('id', 'guessRow-' + guessRowIndex);
  guessRow.forEach((guess, guessIndex) => {
    const tileElement = document.createElement('div');
    tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
    tileElement.classList.add('tile');
    rowElement.append(tileElement);
  })
  tileDisplay.append(rowElement);
})

keys.forEach(key => {
  const buttonElement = document.createElement('button');
  buttonElement.textContent = key;
  buttonElement.setAttribute('id', key);
  buttonElement.addEventListener('click', () => handleClick(key));
  keyboard.append(buttonElement);
})

function handleClick(key) {
  console.log('clicked', key);
  if (key === '«') {
    deleteLetter();
    console.log('guessRows', guessRows);
    return;
  }
  if (key === 'ENTER') {
    console.log('check row');
    console.log('guessRows', guessRows);
    return;
  }
  addLetter(key);
  console.log('guessRows', guessRows);
}

function addLetter(letter) {
  if (currentTile < 5 && currentRow < 6) {
    const selectedTile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
    selectedTile.textContent = letter;
    guessRows[currentRow][currentTile] = letter;
    selectedTile.setAttribute("data", letter);
    currentTile++;
  }
}

function deleteLetter() {
  if (currentTile > 0) {
    currentTile--;
    const selectedTile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
    selectedTile.textContent = '';
    guessRows[currentRow][currentTile] = '';
    selectedTile.setAttribute("data", '');
  }
}