const gameBoard = (() => {
  const board = ["","","","","","","","",""];
  const players = [];
  const setPlayers = (one, two) => {
    players.push(one);
    players.push(two);
  }
  const play = (index) => {
    board[index] = players[0].symbol;
    return players[0].symbol;
  }
  return {play, setPlayers};
})();

const displayController = (() => {
  const boardSquares = document.querySelectorAll(".main>ul>li");

  boardSquares.forEach((square, index) => {
    square.addEventListener("click", () => {
      if (square.className != "occupied"){
        square.className = "occupied";
        square.textContent = gameBoard.play(index);
      }
    });
  });

  
})();

const Player = (symbol) => {
  const symbol = symbol;
  return {symbol};
}

gameBoard.setPlayers(Player("X"), Player("O"));