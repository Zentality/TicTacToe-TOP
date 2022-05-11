const Player = (name, symbol) => {
  return {name, symbol};
}

const displayController = (() => {
  const boardSquaresDOM = document.querySelectorAll(".main>ul>li");
  boardSquaresDOM.forEach((square, index) => {
    square.addEventListener("click", () => {
      if (!square.classList.contains("occupied")){
        square.classList.add("occupied");
        square.textContent = gameBoard.play(index);
      }
    });
  });
  const resultDOM = document.querySelector(".resultModal");
  const printResult = (result) => {
    resultDOM.textContent = result;
    resultDOM.style.display = "flex";
  }
  const resetButtons = document.querySelectorAll(".resetButton");
  resetButtons.forEach((resetButton) => {
    resetButton.addEventListener("click", () => {
      boardSquaresDOM.forEach((square) => {
        resultDOM.style.display = "none";
        square.classList.remove("occupied");
        square.textContent = "";
        gameBoard.reset();
      })
    })
  })
  const endGame = () => {
    boardSquaresDOM.forEach((square) => square.classList.add("occupied"));
  }
  const nameInputs = document.querySelectorAll(".nameInput");
  nameInputs.forEach((nameInput, index) => {
    nameInput.addEventListener(("input"), (e) => {
      gameBoard.players[index].name = (e.target.value);
      if ((e.target.value) == ""){
        gameBoard.players[index].name = `Player ${index}`;
      }
    })
  })
  return {printResult, endGame};
})();

const gameBoard = (() => {
  const board = ["","","","","","","","",""];
  const players = [Player("Player 1","X"), Player("Player 2","O")];
  let playerTurn = 0;
  let gameOver = true;
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
        displayController.endGame();
        return true;
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
    playerTurn = 0;
  }
  return {play, reset, players};
})();
