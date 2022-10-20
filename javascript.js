
const gameBoard = (() => {
  const boardGrid = document.querySelectorAll('.game-grid');
  const renderGrid = () => {
    for (i = 0; i < boardGrid.length; i++) {
      boardGrid[i].addEventListener('click', displayGrid);
    }
  };
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
    makeCheckObj();
    checkWinner();
  }
  
  // TMB = [012, 345, 678]
  // LMR = [036, 147, 258]
  // Two Diagonal = [048, 246]
  let checkObj = {};
  const makeCheckObj = () => {
    for (i = 0; i < boardGrid.length; i++) {
      if (boardGrid[i].textContent !== '') {
        checkObj[i] = boardGrid[i].textContent;
      }
    }
  }
  const checkWinner = () => {
   switch (true) {
    case (checkObj[0] + checkObj[1] + checkObj[2] === 'XXX' ||
      checkObj[0] + checkObj[1] + checkObj[2] === 'OOO' ):
      console.log('yes');
      break;
    case (checkObj[3] + checkObj[4] + checkObj[5] === 'XXX' ||
      checkObj[3] + checkObj[4] + checkObj[5] === 'OOO' ):
      console.log('yes');
      break;
    case (checkObj[6] + checkObj[7] + checkObj[8] === 'XXX' ||
      checkObj[6] + checkObj[7] + checkObj[8] === 'OOO' ):
      console.log('yes');
      break;
    case (checkObj[0] + checkObj[3] + checkObj[6] === 'XXX' ||
      checkObj[0] + checkObj[3] + checkObj[6] === 'OOO' ):
      console.log('yes');
      break;
    case (checkObj[1] + checkObj[4] + checkObj[7] === 'XXX' ||
      checkObj[1] + checkObj[4] + checkObj[7] === 'OOO' ):
      console.log('yes');
      break;
    case (checkObj[2] + checkObj[5] + checkObj[8] === 'XXX' ||
      checkObj[2] + checkObj[5] + checkObj[8] === 'OOO' ):
      console.log('yes');
      break;
    case (checkObj[0] + checkObj[4] + checkObj[8] === 'XXX' ||
      checkObj[0] + checkObj[4] + checkObj[8] === 'OOO' ):
      console.log('yes');
      break;
    case (checkObj[2] + checkObj[4] + checkObj[6] === 'XXX' ||
      checkObj[2] + checkObj[4] + checkObj[6] === 'OOO' ):
      console.log('yes');
      break;
    case (Object.keys(checkObj).length === 9):
      console.log('draw');
      break;
  }
}

  return { renderGrid, makeCheckObj, checkObj };
})();

// const displayController = (() => {

// })();

// const playerFactory = (playerName) => {
//   return { playerName };
// };

gameBoard.renderGrid();
console.log(gameBoard.checkObj);