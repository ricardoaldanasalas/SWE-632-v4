let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");

// Get Reset button & modal elements
const ticTacToeResetButton = document.getElementById("reset");
const ticTacToeResetModal = document.getElementById("ticTacToeResetModal");
const confirmTicTacToeResetButton = document.getElementById("confirmTicTacToeReset");
const cancelTicTacToeResetButton = document.getElementById("cancelTicTacToeReset");

// Get Winning Modal elements
const winModal = document.getElementById("ticTacToeWinModal");
const winMessage = document.getElementById("ticTacToeWinMessage");

// Winning Conditions
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Handle cell click
function handleCellClick(event) {
    if (!gameActive) return; // Prevent clicks after game ends

    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== "") {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    checkWinner();
    if (gameActive) {
        togglePlayer();
    }
}

// Toggle player
function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for winner or draw
function checkWinner() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            statusDisplay.textContent = `🎉 Player ${board[a]} Wins!`;
            showWinModal(board[a]); // SHOW WIN MODAL
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        statusDisplay.textContent = "It's a Draw!";
        showWinModal("Draw"); // SHOW WIN MODAL FOR DRAW
    }
}

// Show win modal when game ends
function showWinModal(winner) {
    if (winner === "Draw") {
        winMessage.textContent = "It's a Draw! 🤝";
    } else {
        winMessage.textContent = `🎉 Player ${winner} Wins!`;
    }
    winModal.style.display = "flex"; // MAKE SURE MODAL APPEARS
}

// Show Reset Confirmation Modal
function confirmTicTacToeReset() {
    ticTacToeResetModal.style.display = "flex";
}

// Reset the game when user confirms
function resetTicTacToeGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusDisplay.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });

    // Hide all modals
    ticTacToeResetModal.style.display = "none";
    winModal.style.display = "none";
}

// Close Reset Modal without resetting
function cancelTicTacToeReset() {
    ticTacToeResetModal.style.display = "none";
}

// Redirect to Homepage
function goHome() {
    window.location.href = "../index.html"; // Ensure this path is correct
}

// Attach event listeners
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

if (ticTacToeResetButton) {
    ticTacToeResetButton.addEventListener("click", confirmTicTacToeReset);
}

if (confirmTicTacToeResetButton) {
    confirmTicTacToeResetButton.addEventListener("click", resetTicTacToeGame);
}

if (cancelTicTacToeResetButton) {
    cancelTicTacToeResetButton.addEventListener("click", cancelTicTacToeReset);
}