const gameBoard = (() => {
  const board = ["","","","","","","","",""];
  return {board};
})();

const displayController = (() => {
  const boardSquares = document.querySelectorAll(".main>ul>li");
  boardSquares.forEach((square, index) => {
    square.addEventListener("click", (e) => {
      gameBoard.board[index] = "X";
      console.log(gameBoard.board);
    });
  });
})();

const Player = (symbol) => {
  const getSymbol = () => symbol;
  return {getSymbol};
}