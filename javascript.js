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
  const makeCheckObj = () => {
    for (i = 0; i < gameBoard.boardGrid.length; i++) {
      if (gameBoard.boardGrid[i].textContent !== '') {
        gameBoard.checkObj[i] = gameBoard.boardGrid[i].textContent;
      }
    }
  };
  const checkWinner = () => {
    switch (true) {
     case (gameBoard.checkObj[0] + gameBoard.checkObj[1] + gameBoard.checkObj[2] === 'XXX' ||
       gameBoard.checkObj[0] + gameBoard.checkObj[1] + gameBoard.checkObj[2] === 'OOO' ):
       console.log('yes');
      displayPanel.displayWinner('Winner!');
       break;
     case (gameBoard.checkObj[3] + gameBoard.checkObj[4] + gameBoard.checkObj[5] === 'XXX' ||
       gameBoard.checkObj[3] + gameBoard.checkObj[4] + gameBoard.checkObj[5] === 'OOO' ):
      displayPanel.displayWinner('Winner!');
       console.log('yes');
       break;
     case (gameBoard.checkObj[6] + gameBoard.checkObj[7] + gameBoard.checkObj[8] === 'XXX' ||
       gameBoard.checkObj[6] + gameBoard.checkObj[7] + gameBoard.checkObj[8] === 'OOO' ):
      displayPanel.displayWinner('Winner!');
       console.log('yes');
       break;
     case (gameBoard.checkObj[0] + gameBoard.checkObj[3] + gameBoard.checkObj[6] === 'XXX' ||
       gameBoard.checkObj[0] + gameBoard.checkObj[3] + gameBoard.checkObj[6] === 'OOO' ):
       console.log('yes');
       break;
     case (gameBoard.checkObj[1] + gameBoard.checkObj[4] + gameBoard.checkObj[7] === 'XXX' ||
       gameBoard.checkObj[1] + gameBoard.checkObj[4] + gameBoard.checkObj[7] === 'OOO' ):
      displayPanel.displayWinner('Winner!');
       console.log('yes');
       break;
     case (gameBoard.checkObj[2] + gameBoard.checkObj[5] + gameBoard.checkObj[8] === 'XXX' ||
       gameBoard.checkObj[2] + gameBoard.checkObj[5] + gameBoard.checkObj[8] === 'OOO' ):
      displayPanel.displayWinner('Winner!');
       console.log('yes');
       break;
     case (gameBoard.checkObj[0] + gameBoard.checkObj[4] + gameBoard.checkObj[8] === 'XXX' ||
       gameBoard.checkObj[0] + gameBoard.checkObj[4] + gameBoard.checkObj[8] === 'OOO' ):
      displayPanel.displayWinner('Winner!');
       console.log('yes');
       break;
     case (gameBoard.checkObj[2] + gameBoard.checkObj[4] + gameBoard.checkObj[6] === 'XXX' ||
       gameBoard.checkObj[2] + gameBoard.checkObj[4] + gameBoard.checkObj[6] === 'OOO' ):
       displayPanel.displayWinner('Winner!');
       console.log('yes');
       break;
     case (Object.keys(gameBoard.checkObj).length === 9):
       console.log('draw');
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
    document.querySelector('.player1-name').textContent = 'Player 1: ' + inputName1.value;
    inputName1.value = '';
  });
  addButton2.addEventListener('click', (e) => {
    e.preventDefault();
    const inputName2 = document.querySelector('.player2-name-input');
    document.querySelector('.player2-name').textContent = 'Player 2: ' +inputName2.value;
    inputName2.value = '';
  });
  // let playersObj = playerFactory(inputName1, inputName2);
  // return { playersObj }
})();



