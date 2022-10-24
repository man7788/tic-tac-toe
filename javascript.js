// Event listerner still not removed after computer 'O' move 

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
      console.log(`fired X ${gridNum}`)
      testObj.check = 'X';
      } else {
        boardGrid[gridNum].textContent = 'O';
        testObj.check = 'O';
        console.log(`fired O ${gridNum}`)

      }
    boardGrid[gridNum].removeEventListener('click', displayGrid);
    checkFunction.makeCheckObj();
    checkFunction.checkWinner();
    if (!checkFunction.turnOffComputer['check'] === true) {
      computerLogic.computerTurn();
    }
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
    computerLogic.startComputerTurn();
    gameBoard.renderGrid();
    gameBoard.checkObj = {};
    gameBoard.testObj['check'] = 'O';
    document.querySelector('.winner-container').replaceChildren();
    computerLogic.occupiedList.length = 0;
    checkFunction.turnOffComputer['check'] = true;
    playerInput.playerName1.textContent = '(X)Player 1: ';
    playerInput.playerName2.textContent = '(O)Player 2: ';
  }
  restartButton.addEventListener('click', restartGame);

  const computerplayer2 = document.querySelector('.computer-button');
  const addcomputerplayer2 = () => {
    if (Object.keys(gameBoard.checkObj).length > 0) {
      alert('Cannot add computer move after game started.');
      return;
    }
    computerLogic.startComputerTurn();
    checkFunction.turnOffComputer['check'] = false;
  };
  computerplayer2.addEventListener('click', addcomputerplayer2);
})();

const checkFunction = (() => {
  let turnOffComputer = { check: true };
  let winnerText;
  const findText = () => {
    turnOffComputer['check'] = true;
    if (gameBoard.testObj['check'] === 'X') {
      winnerText = 'Player 1 Wins!';
    } else {
      winnerText = 'Player 2 Wins!';
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
    let streak = {
      0: '0-1-2',
      1: '3-4-5',
      2: '6-7-8',
      3: '0-3-6',
      4: '1-4-7',
      5: '2-5-8',
      6: '0-4-8',
      7: '2-4-6',
    };
    for (let key in streak) {
      num = streak[key].split('-')
      let zero = num[0]
      let one = num[1]
      let two = num[2]
      if (target[zero] + target[one] + target[two] === 'XXX' ||
        target[zero] + target[one] + target[two] === 'OOO') {
        findText();
        return;
      }
    }
    if (Object.keys(target).length === 9) {
      displayPanel.displayWinner('Draw!');
      turnOffComputer['check'] = true;
    }
  };



  // const checkWinner = () => {
  //   const target = gameBoard.checkObj;
  //   switch (true) {
  //     case (target[0] + target[1] + target[2] === 'XXX' ||
  //       target[0] + target[1] + target[2] === 'OOO' ):
  //       findText();
  //       break;
  //     case (target[3] + target[4] + target[5] === 'XXX' ||
  //       target[3] + target[4] + target[5] === 'OOO' ):
  //       findText();
  //       break;
  //     case (target[6] + target[7] + target[8] === 'XXX' ||
  //       target[6] + target[7] + target[8] === 'OOO' ):
  //       findText();
  //       break;
  //     case (target[0] + target[3] + target[6] === 'XXX' ||
  //       target[0] + target[3] + target[6] === 'OOO' ):
  //       findText();
  //       break;
  //     case (target[1] + target[4] + target[7] === 'XXX' ||
  //       target[1] + target[4] + target[7] === 'OOO' ):
  //       findText();
  //       break;
  //     case (target[2] + target[5] + target[8] === 'XXX' ||
  //       target[2] + target[5] + target[8] === 'OOO' ):
  //       findText();
  //       break;
  //     case (target[0] + target[4] + target[8] === 'XXX' ||
  //       target[0] + target[4] + target[8] === 'OOO' ):
  //       findText();
  //       break;
  //     case (target[2] + target[4] + target[6] === 'XXX' ||
  //       target[2] + target[4] + target[6] === 'OOO' ):
  //       findText();
  //       break;
  //     case (Object.keys(target).length === 9):
  //       displayPanel.displayWinner('Draw!');
  //       turnOffComputer['check'] = true;
  //       break;
  //     }
  //  };
  return { makeCheckObj, checkWinner, turnOffComputer };
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
  const computerplayer2 = document.querySelector('.computer-button');

  addButton1.addEventListener('click', (e) => {
    e.preventDefault();
    playerName1.textContent = `(X)Player 1: ${inputName1.value}`;
    inputName1.value = '';
  });

  const addplayer2 = (e) => {
    e.preventDefault();
    playerName2.textContent = `(O)Player 2: ${inputName2.value}`;
    inputName2.value = '';
  };
  addButton2.addEventListener('click', addplayer2);
  
  const addplayer2Computer = (e) => {
    if (Object.keys(gameBoard.checkObj).length > 0) {
      return;
    }
    e.preventDefault();
    playerName2.textContent = `(O)Player 2: Computer`;
    inputName2.value = '';
    addButton2.removeEventListener('click', addplayer2);
  };
 
  computerplayer2.addEventListener('click', addplayer2Computer);

  return { playerName1, playerName2 }
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
    return computerNumber;
  };

  let occupiedList = [];

  const occupiedGrid = (e) => {
    let occupiedNum = e.target.id.slice(-1);
    occupiedList.push(occupiedNum);
    board[occupiedNum].removeEventListener('click', occupiedGrid);
    console.log('occupied ' + occupiedNum);
  };
  
  const computerTurn = () => {
    let numberToPut = randomNumber();
    let safetyBreak = 0;
    while (occupiedList.includes(numberToPut) && safetyBreak < 100) {
        numberToPut = randomNumber();
        safetyBreak++
      } 
    console.log(numberToPut);
    board[numberToPut].textContent = 'O';
    occupiedList.push(numberToPut);
    board[numberToPut].removeEventListener('click', occupiedGrid);
    board[numberToPut].removeEventListener('click', gameBoard.displayGrid);
    gameBoard.testObj['check'] = 'O';
    if (!checkFunction.turnOffComputer['check'] === true) {
    checkFunction.makeCheckObj();
    checkFunction.checkWinner();
    }
  };

  // for (i = 0; i < board.length; i++) {
  //   board[i].addEventListener('click', occupiedGrid);
  // }

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

console.log(checkFunction.checkWinner());





