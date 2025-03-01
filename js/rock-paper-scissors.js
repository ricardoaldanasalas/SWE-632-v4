let playerScore = 0;
let computerScore = 0;

const rpsWinModal = document.getElementById("rpsWinModal");
const rpsWinMessage = document.getElementById("rpsWinMessage");
const rpsResetButton = document.getElementById("rpsResetButton"); // Reset button
const rpsResetModal = document.getElementById("rpsResetModal"); // Reset confirmation modal
const confirmResetButton = document.getElementById("confirmReset"); // Yes button
const cancelResetButton = document.getElementById("cancelReset"); // No button

function playGame(playerChoice) {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    let result = "";

    if (playerChoice === computerChoice) {
        result = "It's a tie!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        result = "You win!";
        playerScore++;
    } else {
        result = "Computer wins!";
        computerScore++;
    }
    
    document.getElementById("result").textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;
    document.getElementById("playerScore").textContent = playerScore;
    document.getElementById("computerScore").textContent = computerScore;

    // Check for game over (first to 5 wins)
    if (playerScore === 5 || computerScore === 5) {
        rpsWinMessage.textContent = playerScore === 5 ? "🎉 You won the game!" : "💻 Computer won the game!";
        rpsWinModal.style.display = "flex"; // Show modal pop-up
    }
}

// Show Reset Confirmation Modal
function confirmRpsReset() {
    rpsResetModal.style.display = "flex";
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