const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.keyboard-container');
const messageDisplay = document.querySelector('.message-container');

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
let isGameOver = false;

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
    checkRow();
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

function checkRow() {
  const guess = guessRows[currentRow].join('');

  if (currentTile > 4) {
    console.log('guess is ' + guess, 'wordle is ' + wordle);
    flipTile();
    if (wordle == guess) {
      showMessage('Correct!');
      isGameOver = true;
      return;
    } else {
      if (currentRow >= 5) {
        isGameOver = true;
        showMessage('Game Over');
        return;
      }
      if (currentRow < 5) {
        currentRow++;
        currentTile = 0;
      }
    }
  }
}

function showMessage(message) {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  setTimeout(() => messageDisplay.removeChild(messageElement), 2000);
}

function addColorToKey(keyLetter, color) {
  const key = document.getElementById(keyLetter);
  console.log(key);
  key.classList.add(color);
}

function flipTile() {
  const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes;
  rowTiles.forEach((tile, index) => {
    const dataLetter = tile.getAttribute('data');

    let checkWordle = wordle;
    const guess = [];

    rowTiles.forEach(tile => {
      guess.push(
        {
          letter: tile.getAttribute('data'),
          color: 'grey-overlay'
        }
      );
    });

    guess.forEach((guess,index) => {
      if (guess.letter == wordle[index]) {
        guess.color = 'green-overlay';
        checkWordle = checkWordle.replace(guess.letter, '');
      }
    })

    guess.forEach(guess => {
      if (checkWordle.includes(guess.letter)) {
        guess.color = 'yellow-overlay';
        checkWordle = checkWordle.replace(guess.letter, '');
      }
    })

    setTimeout(() => {
      tile.classList.add('flip');
      tile.classList.add(guess[index].color);
      addColorToKey(guess[index].letter, guess[index].color);
    }, 500 * index)
  })
}