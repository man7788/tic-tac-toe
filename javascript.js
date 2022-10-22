const gameBoard = (() => {
  const boardGrid = document.querySelectorAll('.game-grid');
  const renderGrid = () => {
    for (i = 0; i < boardGrid.length; i++) {
      boardGrid[i].addEventListener('click', displayGrid);
    }
  }

  let checkObj = {};
  let testObj = { check: 'O'};

  const displayGrid = (e) => {
    gridNum = e.target.id.slice(-1);
    if (testObj.check === 'O') {
      boardGrid[gridNum].textContent = 'X';
      testObj.check = 'X';
      } else {
        boardGrid[gridNum].textContent = 'O';
        testObj.check = 'O';
      }
    boardGrid[gridNum].removeEventListener('click', displayGrid);
    checkFunction.makeCheckObj();
    checkFunction.checkWinner();
  }
  return { renderGrid, boardGrid, displayGrid, checkObj, testObj };
})();

const displayController = (() => {
  const startButton = document.querySelector('.start');
  const startGame = () => {
    if (document.querySelector('.grid-container').style.display === 'none') {
      document.querySelector('.grid-container').style.display = 'grid';
    }
    gameBoard.renderGrid();
  }
  startButton.addEventListener('click', startGame);

  const restartButton = document.querySelector('.restart');
  const restartGame = () => {
    for (i = 0; i < gameBoard.boardGrid.length; i++) {
      gameBoard.boardGrid[i].replaceChildren();
    }
    gameBoard.renderGrid();
    gameBoard.checkObj = {};
    gameBoard.testObj['check'] = 'O';
    document.querySelector('.winner-container').replaceChildren();
  }
  restartButton.addEventListener('click', restartGame);
})();

const checkFunction = (() => {
  let winnterText;
  const findText = () => {
    if (gameBoard.testObj['check'] === 'X') {
      winnterText = 'Player 1 Wins!'
    } else {
      winnterText = 'Player 2 Wins!'
    }
    displayPanel.displayWinner(winnterText);
  };
  const makeCheckObj = () => {
    for (i = 0; i < gameBoard.boardGrid.length; i++) {
      if (gameBoard.boardGrid[i].textContent !== '') {
        gameBoard.checkObj[i] = gameBoard.boardGrid[i].textContent;
      }
    }
  };
  const checkWinner = () => {
    const target = gameBoard.checkObj;
    switch (true) {
      case (target[0] + target[1] + target[2] === 'XXX' ||
        target[0] + target[1] + target[2] === 'OOO' ):
        findText();
        break;
      case (target[3] + target[4] + target[5] === 'XXX' ||
        target[3] + target[4] + target[5] === 'OOO' ):
        findText();
        break;
      case (target[6] + target[7] + target[8] === 'XXX' ||
        target[6] + target[7] + target[8] === 'OOO' ):
        findText();
        break;
      case (target[0] + target[3] + target[6] === 'XXX' ||
        target[0] + target[3] + target[6] === 'OOO' ):
        findText();
        break;
      case (target[1] + target[4] + target[7] === 'XXX' ||
        target[1] + target[4] + target[7] === 'OOO' ):
        findText();
        break;
      case (target[2] + target[5] + target[8] === 'XXX' ||
        target[2] + target[5] + target[8] === 'OOO' ):
        findText();
        break;
      case (target[0] + target[4] + target[8] === 'XXX' ||
        target[0] + target[4] + target[8] === 'OOO' ):
        findText();
        break;
      case (target[2] + target[4] + target[6] === 'XXX' ||
        target[2] + target[4] + target[6] === 'OOO' ):
        findText();
        break;
      case (Object.keys(target).length === 9):
        displayPanel.displayWinner('Draw!');
        break;
      }
   }
  return { makeCheckObj, checkWinner };
})();
 
const displayPanel = (() => {
  const displayWinner = (name) => {
    const winnerTitle = document.createElement('div');
    winnerTitle.textContent = name;
    document.querySelector('.winner-container').appendChild(winnerTitle);
    for (i = 0; i < gameBoard.boardGrid.length; i++) {
      gameBoard.boardGrid[i].removeEventListener('click', gameBoard.displayGrid);
    }
  }
  return { displayWinner }
})();

const playerFactory = (playerName1, playerName2) => {
  return { playerName1, playerName2 };
};

const playerInput = (() => {
  const addButton1 = document.querySelector('.player1-button');
  const addButton2 = document.querySelector('.player2-button');
  addButton1.addEventListener('click', (e) => {
    e.preventDefault();
    const inputName1 = document.querySelector('.player1-name-input');
    document.querySelector('.player1-name').textContent = '(X)Player 1: ' + inputName1.value;
    inputName1.value = '';
  });
  addButton2.addEventListener('click', (e) => {
    e.preventDefault();
    const inputName2 = document.querySelector('.player2-name-input');
    document.querySelector('.player2-name').textContent = '(O)Player 2: ' +inputName2.value;
    inputName2.value = '';
  });
})();




