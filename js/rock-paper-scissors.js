let playerScore = 0;
let computerScore = 0;
let isVsComputer = true;
let isPlayerOneTurn = true; // Track which player's turn it is
let playerOneChoice = null;

const rpsWinModal = document.getElementById("rpsWinModal");
const rpsWinMessage = document.getElementById("rpsWinMessage");
const rpsResetButton = document.getElementById("rpsResetButton");
const rpsResetModal = document.getElementById("rpsResetModal");
const confirmResetButton = document.getElementById("confirmReset");
const cancelResetButton = document.getElementById("cancelReset");

const rpsGameModeModal = document.getElementById("rpsGameModeModal");
const playVsComputerBtn = document.getElementById("playVsComputer");
const playVsPlayerBtn = document.getElementById("playVsPlayer");

const turnIndicator = document.getElementById("turnIndicator");

// Home button and modal elements
const homeButton = document.getElementById("homeButton");
const homeConfirmModal = document.getElementById("homeConfirmModal");
const confirmHome = document.getElementById("confirmHome");
const cancelHome = document.getElementById("cancelHome");

// Show confirmation modal when home button is clicked
homeButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent immediate navigation
    homeConfirmModal.style.display = "flex";
});

// If user confirms, go to homepage
confirmHome.addEventListener("click", function () {
    window.location.href = "../index.html"; // Adjusted path for mini-games
});

// If user cancels, hide the modal
cancelHome.addEventListener("click", function () {
    homeConfirmModal.style.display = "none";
});

// Show game mode selection modal on load
window.onload = function () {
    rpsGameModeModal.style.display = "flex";
};

// Set game mode based on player selection
playVsComputerBtn.addEventListener("click", function () {
    isVsComputer = true;
    rpsGameModeModal.style.display = "none";
    turnIndicator.textContent = "Player 1's Turn";
});

playVsPlayerBtn.addEventListener("click", function () {
    isVsComputer = false;
    rpsGameModeModal.style.display = "none";
    turnIndicator.textContent = "Player 1's Turn";
});

// Game logic for both modes
function playGame(choice) {
    if (isVsComputer) {
        playVsComputer(choice);
    } else {
        playVsPlayer(choice);
    }
}

// Function to handle game logic when playing against the computer
function playVsComputer(playerChoice) {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    determineWinner(playerChoice, computerChoice);
}

// Function to handle game logic when playing against another player
function playVsPlayer(choice) {
    if (isPlayerOneTurn) {
        // Store Player 1's choice and switch turns
        playerOneChoice = choice;
        isPlayerOneTurn = false;
        turnIndicator.textContent = "Player 2's Turn";
    } else {
        // Player 2 selects their choice, and we determine the winner
        determineWinner(playerOneChoice, choice);
        isPlayerOneTurn = true;
        turnIndicator.textContent = "Player 1's Turn";
    }
}

// Function to determine the winner
function determineWinner(player1Choice, player2Choice) {
    let result = "";

    if (player1Choice === player2Choice) {
        result = "It's a tie!";
    } else if (
        (player1Choice === "rock" && player2Choice === "scissors") ||
        (player1Choice === "paper" && player2Choice === "rock") ||
        (player1Choice === "scissors" && player2Choice === "paper")
    ) {
        result = isVsComputer ? "You win!" : "Player 1 wins!";
        playerScore++;
    } else {
        result = isVsComputer ? "Computer wins!" : "Player 2 wins!";
        computerScore++;
    }

    document.getElementById("result").textContent = 
        `Player 1 chose ${player1Choice}, Player 2 chose ${player2Choice}. ${result}`;
    document.getElementById("playerScore").textContent = playerScore;
    document.getElementById("computerScore").textContent = computerScore;

    // Check for game over (first to 5 wins)
    if (playerScore === 5 || computerScore === 5) {
        rpsWinMessage.textContent = playerScore === 5 ? "🎉 Player 1 won the game!" : "🎉 Player 2 won the game!";
        rpsWinModal.style.display = "flex";
    }
}

// Reset the game when user confirms
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById("playerScore").textContent = playerScore;
    document.getElementById("computerScore").textContent = computerScore;
    document.getElementById("result").textContent = "Game reset! Choose Rock, Paper, or Scissors to start again.";

    // Hide both modals when the game resets
    rpsWinModal.style.display = "none";
    rpsResetModal.style.display = "none";
}


// Close Reset Modal without resetting
function cancelReset() {
    rpsResetModal.style.display = "none";
}

// Navigate back to the home page
function goHome() {
    window.location.href = "../index.html"; 
}

// Attach event listener to reset button
if (rpsResetButton) {
    rpsResetButton.addEventListener("click", confirmRpsReset);
}

// Attach event listener to reset confirmation modal buttons
if (confirmResetButton) {
    confirmResetButton.addEventListener("click", resetGame);
}

if (cancelResetButton) {
    cancelResetButton.addEventListener("click", cancelReset);
}

