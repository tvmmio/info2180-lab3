document.addEventListener("DOMContentLoaded", function () {
  const squares = document.querySelectorAll("#board div");
  const status = document.getElementById("status");
  const newGameButton = document.querySelector(".btn");
  const startMessage = status.textContent;

  let currentPlayer = "X";
  let gameState = ["", "", "", "", "", "", "", "", ""];

  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function checkWinner() {
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (gameState[a] !== "" && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        return gameState[a];
      }
    }
    return null;
  }

  squares.forEach(function (square, index) {
    square.classList.add("square");

    square.addEventListener("click", function () {
      gameState[index] = currentPlayer;
      square.textContent = currentPlayer;
      square.classList.add(currentPlayer);

      const winner = checkWinner();
      if (winner) {
        status.textContent = "Congratulations! " + winner + " is the Winner!";
        status.classList.add("you-won");
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    });

    square.addEventListener("mouseover", function () {
      square.classList.add("hover");
    });

    square.addEventListener("mouseout", function () {
      square.classList.remove("hover");
    });
  });

  newGameButton.addEventListener("click", function () {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    squares.forEach(function (square) {
      square.textContent = "";
      square.classList.remove("X", "O");
    });
    status.textContent = startMessage;
    status.classList.remove("you-won");
  });
});
