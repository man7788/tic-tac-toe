
const gameBoard = (() => {
  const boardGrid = document.querySelectorAll('.game-grid');
  const renderGrid = () => {
    for (i = 0; i < boardGrid.length; i++) {
      boardGrid[i].addEventListener('click', displayGrid);
    }
  };
  let displayCount = 1;
  const displayGrid = (e) => {
    displayCount += 1;
    gridNum = e.target.id;
    gridNum = gridNum.slice(-1);
    if (displayCount % 2 === 0) {
      boardGrid[gridNum].textContent = 'X';
      } else {
        boardGrid[gridNum].textContent = 'O';
      }
    boardGrid[gridNum].removeEventListener('click', displayGrid);
  }
  return { renderGrid };
})();

const displayController = (() => {

})();

const playerFactory = (playerName) => {
  return { playerName };
};

gameBoard.renderGrid();

// Add click feature to each grid
// Make alternative X and O
// Render grid to display new mark
// Turn off click feature of marked grid