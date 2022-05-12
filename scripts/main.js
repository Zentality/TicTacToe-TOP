const Player = (name, symbol, isComputer, difficulty) => {
  return {name, symbol, isComputer, difficulty};
}

const displayController = (() => {
  const boardSquaresDOM = document.querySelectorAll(".main>ul>li");
  boardSquaresDOM.forEach((square, index) => {

    square.addEventListener("click", () => {
      if (square.classList.contains("occupied")){
        return;
      }
      gameBoard.play(index);
      gameBoard.computerPlay();
      square.style.removeProperty('Color');
    });

    square.addEventListener("mouseover", () => {
      if (!square.classList.contains("occupied")){
        square.textContent = gameBoard.players[gameBoard.getPlayerTurn()].symbol;
        square.style.color = "rgb(190,190,200)";
      }
    })

    square.addEventListener("mouseleave", () => {
      if (!square.classList.contains("occupied")){
        square.textContent = "";
        square.style.removeProperty('Color');
      }
    })
  });
  
  const playerOneMode = document.querySelectorAll(".playerOne>.playerType>div")
  playerOneMode.forEach((setting, index) => {
    setting.addEventListener(("click"), () => {
      playerOneMode.forEach((temp) => {
        temp.classList.remove("active");
      })
      setting.classList.add("active");
      gameBoard.players[0].isComputer = !!index;
      gameBoard.changedDifficulty();
    })
  })
  const playerTwoMode = document.querySelectorAll(".playerTwo>.playerType>div")
  playerTwoMode.forEach((setting, index) => {
    setting.addEventListener(("click"), () => {
      playerTwoMode.forEach((temp) => {
        temp.classList.remove("active");
      })
      setting.classList.add("active");
      gameBoard.players[1].isComputer = !!index;
      gameBoard.changedDifficulty();
    })
  })
  const playerOneDifficulty = document.querySelectorAll(".playerOne>.difficulty>div")
  playerOneDifficulty.forEach((setting, index) => {
    setting.addEventListener(("click"), () => {
      playerOneDifficulty.forEach((temp) => {
        temp.classList.remove("active");
      })
      setting.classList.add("active");
      gameBoard.players[0].difficulty = index;
    })
  })
  const playerTwoDifficulty = document.querySelectorAll(".playerTwo>.difficulty>div")
  playerTwoDifficulty.forEach((setting, index) => {
    setting.addEventListener(("click"), () => {
      playerTwoDifficulty.forEach((temp) => {
        temp.classList.remove("active");
      })
      setting.classList.add("active");
      gameBoard.players[1].difficulty = index;
    })
  })

  const setSquare = (symbol, index) => {
    let square = boardSquaresDOM[index];
    square.classList.add("occupied");
    square.textContent = symbol;
  }

  const resultDOM = document.querySelector(".resultModal");
  const resultDomText = document.querySelector(".resultModal>p");
  const printResult = (result) => {
    resultDomText.textContent = result;
    resultDomText.style.display = "block";
    setTimeout(() => resultDOM.style.display = "flex", 500)
  }

  const resetButtons = document.querySelectorAll(".resetButton");
  resetButtons.forEach((resetButton) => {
    resetButton.addEventListener("click", () => {
      boardSquaresDOM.forEach((square) => {
        resultDOM.style.display = "none";
        square.classList.remove("occupied");
        square.textContent = "";
      })
      gameBoard.reset();
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
        gameBoard.players[index].name = `Player ${index + 1}`;
      }
    })
  })

  return {printResult, endGame, setSquare};
})();

const gameBoard = (() => {
  const board = ["","","","","","","","",""];
  const players = [Player("Player 1","X", false, 0), Player("Player 2","O", false, 0)];
  let playerTurn = 0;
  let gameOver = true;

  const play = (index) => {
    if (index == "computer"){
      index = computerDecision();
    }
    if (gameOver){return};
    updateBoard(index);
    if (checkForWinner(board)){
      displayController.printResult(checkForWinner(board));
      displayController.endGame();
      gameOver = true;
    }
  }

  const updateBoard = (index) => {
    board[index] = players[playerTurn].symbol;
    displayController.setSquare(players[playerTurn].symbol, index);
  }

  const endTurn = () => {
    playerTurn = (playerTurn + 1) % 2;
  }

  const computerPlay = () => {
    while (players[(playerTurn + 1) % 2].isComputer && !gameOver){
      endTurn();
      play("computer");
    }
    endTurn();
  }

  const changedDifficulty = () => {
    if (players[playerTurn].isComputer && !gameOver){
      play("computer");
      if (players[(playerTurn + 1) % 2].isComputer && !gameOver){
        computerPlay();
      } else {
        endTurn();
      }
    }
  }

  const computerDecision = () => {
    let legalMoves = [];
    for (let i = 0; i < 9; i++){
      if (board[i] == ""){
        legalMoves.push(i);
      }
    }
    if (legalMoves.length == 0){gameOver = true};

    if (players[playerTurn].difficulty == 0){
      return legalMoves[Math.floor(Math.random() * legalMoves.length)];
    } else if (players[playerTurn].difficulty == 1){
      for (let i = 0; i < legalMoves.length; i++){
        tempBoard = board.slice();
        tempBoard[legalMoves[i]] = players[playerTurn].symbol;
        if (checkForWinner(tempBoard)){
          return legalMoves[i];
        }
      }
      for (let i = 0; i < legalMoves.length; i++){
        tempBoard = board.slice();
        tempBoard[legalMoves[i]] = players[(playerTurn + 1) % 2].symbol;
        if (checkForWinner(tempBoard)){
          return legalMoves[i];
        }
      }
      return legalMoves[Math.floor(Math.random() * legalMoves.length)];
    } else if (players[playerTurn].difficulty == 2){

    }
  }

  const findBestMove = (legal, currentBoard) => {
    move = -1;
    legal.foreach((move), () => {
      if (bestMove > move){
        move = bestMove;
      }
    })
    return move;
  }

  const checkForWinner = (boardToCheck) => {
    const winCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let i = 0; i < 8; i++){
      if (boardToCheck[winCombinations[i][0]] == "" || boardToCheck[winCombinations[i][1]] == "" || boardToCheck[winCombinations[i][2]] == "" ){
        continue;
      }
      if ((boardToCheck[winCombinations[i][0]] == boardToCheck[winCombinations[i][1]]) && (boardToCheck[winCombinations[i][0]] == boardToCheck[winCombinations[i][2]])){
        return (`The winner is ${players[playerTurn].name}!`);
      }
    }
    if (!boardToCheck.includes("")){
      return (`The result is a tie...`);
    }
  }

  const reset = () => {
    for (let i = 0; i < 9; i++){
      board[i] = "";
    }
    gameOver = false;
    playerTurn = 0;
     changedDifficulty();
  }

  const getPlayerTurn = () => {
    return playerTurn;
  }
  return {play, reset, players, computerPlay, getPlayerTurn, endTurn, changedDifficulty};
})();
