
const gameBoard = (() => {
  const boardGrid = document.querySelectorAll('.game-grid');
  const renderGrid = () => {
    for (i = 0; i < boardGrid.length; i++) {
      boardGrid[i].textContent = 'X';
    }
  };
  return { renderGrid };
})();

let displayController = (() => {

})();

const playerFactory = (playerName) => {
  return { playerName };
};

gameBoard.renderGrid();
