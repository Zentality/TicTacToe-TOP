const Player = (name, symbol) => {
  return {name, symbol};
}

const displayController = (() => {
  const boardSquaresDOM = document.querySelectorAll(".main>ul>li");
  boardSquaresDOM.forEach((square, index) => {
    square.addEventListener("click", () => {
      if (square.className != "occupied"){
        square.className = "occupied";
        square.textContent = gameBoard.play(index);
      }
    });
  });
  const resultDOM = document.querySelector(".resultModal");
  const printResult = (result) => {
    resultDOM.textContent = result;
    resultDOM.style.display = "flex";
  }
  const resetButton = document.querySelector("#resetButton");
  resetButton.addEventListener("click", () => {
    boardSquaresDOM.forEach((square) => {
      resultDOM.style.display = "none";
      square.className = "";
      square.textContent = "";
      gameBoard.reset();
    })
  })
  return {printResult};
})();

const gameBoard = (() => {
  const board = ["","","","","","","","",""];
  const players = [Player("PlayerX","X"), Player("PlayerO","O")];
  let playerTurn = 0;
  let gameOver = false;
  const play = (index) => {
    if (gameOver){return};
    if (playerTurn == 0){
      board[index] = players[0].symbol;
      checkForWinner();
      playerTurn = 1;
      return players[0].symbol;
    } else {
      board[index] = players[1].symbol;
      checkForWinner();
      playerTurn = 0;
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
        displayController.printResult(`The winner is ${players[playerTurn].name}!`);
        return;
      }
    }
    if (!board.includes("")){
      displayController.printResult(`The result is a tie...`);
    }
  }
  const reset = () => {
    for (let i = 0; i < 9; i++){
      board[i] = "";
    }
    gameOver = false;
  }
  return {play, reset};
})();
