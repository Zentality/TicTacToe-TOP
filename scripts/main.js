const gameBoard = (() => {
  const board = ["","","","","","","","",""];
  return {board};
})();

const displayController = (() => {
  const boardSquares = document.querySelectorAll(".main>ul>li");
  boardSquares.forEach(square => {
    square.addEventListener("click", (e) => {
      console.log((e.target.attributes.id.value).replace(/[a-z]/g, ""));
    });
  });
})();

const Player = (symbol) => {
  const getSymbol = () => symbol;
  return {getSymbol};
}