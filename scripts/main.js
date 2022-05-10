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

  const printResult = (result) => {
    
  }
})();

const gameBoard = (() => {
  const board = ["","","","","","","","",""];
  const players = [];
  const setPlayers = (one, two) => {
    players.push(one);
    players.push(two);
  }
  let playerTurn = 1;
  let gameOver = false;
  const play = (index) => {
    if (gameOver){return};
    if (playerTurn == 1){
      board[index] = players[0].symbol;
      playerTurn = 2;
      checkForWinner();
      return players[0].symbol;
    } else {
      playerTurn = 1;
      board[index] = players[1].symbol;
      checkForWinner();
      return players[1].symbol;
    }
  }
  const checkForWinner = () => {
    const winCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let i = 0; i < 8; i++){
      if (board[winCombinations[i][0]] == "" || board[winCombinations[i][1]] == "" || board[winCombinations[i][2]] == "" ){
        continue;
      }
      if ((board[winCombinations[i][0]] == board[winCombinations[i][1]]) && (board[winCombinations[i][0]] == board[winCombinations[i][2]])){
        gameOver = true;
        break;
      }
    }
  }
  return {play, setPlayers};
})();

const Player = (symbol) => {
  return {symbol};
}

gameBoard.setPlayers(Player("X"), Player("O"));