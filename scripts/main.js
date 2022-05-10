const gameBoard = (() => {
  const board = ["","","","","","","","",""];
  const play = (index, symbol) => {
    board[index] = symbol;
  }
  return {play};
})();

const displayController = (() => {
  const boardSquares = document.querySelectorAll(".main>ul>li");

  boardSquares.forEach((square, index) => {
    square.addEventListener("click", () => {
      gameBoard.play(index, "X");
      square.textContent = "X";
    });
  });

  
})();

const Player = (symbol) => {
  const getSymbol = () => symbol;
  return {getSymbol};
}