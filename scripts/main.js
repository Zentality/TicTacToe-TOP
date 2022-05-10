const gameBoard = (() => {
  const board = ["","","","","","","","",""];
  const players = [];
  const setPlayers = (one, two) => {
    players.push(one);
    players.push(two);
  }
  let playerTurn = 1;
  const play = (index) => {
    if (playerTurn == 1){
      board[index] = players[0].symbol;
      playerTurn = 2;
      return players[0].symbol;
    } else {
      playerTurn = 1;
      board[index] = players[1].symbol;
      return players[1].symbol;
    }
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
  return {symbol};
}

gameBoard.setPlayers(Player("X"), Player("O"));