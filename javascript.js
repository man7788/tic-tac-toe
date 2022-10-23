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
    computerLogic.occupiedList.length = 0;
    computerLogic.startComputerTurn();
  }
  restartButton.addEventListener('click', restartGame);
})();

const checkFunction = (() => {
  let winnerText;
  const findText = () => {
    if (gameBoard.testObj['check'] === 'X') {
      winnerText = 'Player 1 Wins!'
    } else {
      winnerText = 'Player 2 Wins!'
    }
    displayPanel.displayWinner(winnerText);
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
      default: computerLogic.computerTurn();
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
    computerLogic.stopComputerTurn();
  }
  return { displayWinner }
})();

const playerInput = (() => {
  const playerName1 = document.querySelector('.player1-name');
  const playerName2 = document.querySelector('.player2-name');
  const addButton1 = document.querySelector('.player1-button');
  const addButton2 = document.querySelector('.player2-button');
  const inputName1 = document.querySelector('.player1-name-input');
  const inputName2 = document.querySelector('.player2-name-input');
  addButton1.addEventListener('click', (e) => {
    e.preventDefault();
    playerName1.textContent += ` ${inputName1.value}`;
    inputName1.value = '';
  });
  addButton2.addEventListener('click', (e) => {
    e.preventDefault();
    playerName2.textContent += ` ${inputName2.value}`;
    inputName2.value = '';
  });
})();

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomInt = Math.floor(Math.random() * (max - min) + min);
  return { randomInt };
}

const computerLogic = (() => {
  let board = gameBoard.boardGrid;

  const randomNumber = () => {
    let computerNumber = getRandomInt(0, 9);
    computerNumber = computerNumber.randomInt;
    computerNumber = computerNumber.toString();
    console.log(computerNumber);
    return computerNumber;
  };

  let occupiedList = [];

  const occupiedGrid = (e) => {
    let occupiedNum = e.target.id.slice(-1);
    occupiedList.push(occupiedNum);
    board[occupiedNum].removeEventListener('click', occupiedGrid);
  };
  
  const computerTurn = () => {
    let numberToPut = randomNumber();
    let safetyBreak = 0;
    while (occupiedList.includes(numberToPut) && safetyBreak < 100) {
        numberToPut = randomNumber();
        safetyBreak++
      } 
    board[numberToPut].textContent = 'O';
    occupiedList.push(numberToPut);
    board[numberToPut].removeEventListener('click', occupiedGrid);
    board[numberToPut].removeEventListener('click', gameBoard.displayGrid);
    gameBoard.testObj['check'] = 'O';
  };

  for (i = 0; i < board.length; i++) {
    board[i].addEventListener('click', occupiedGrid);
  }

  const startComputerTurn = () => {
    for (i = 0; i < board.length; i++) {
      board[i].addEventListener('click', occupiedGrid);
    }
  };

  const stopComputerTurn = () => {
    for (i = 0; i < board.length; i++) {
      board[i].removeEventListener('click', occupiedGrid);
    }
  };

  return { occupiedList, computerTurn, startComputerTurn, stopComputerTurn};
})();

console.log(computerLogic.occupiedList);

// const randomNumber = () => {
//   let computerNumber = getRandomInt(0, 10);
//   computerNumber = computerNumber.randomInt;
//   computerNumber = computerNumber.toString();
//   return computerNumber;
// };

// console.log(randomNumber());






