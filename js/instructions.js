function openModal(game) {
    const modal = document.getElementById("instruction-modal");
    const title = document.getElementById("modal-title");
    const text = document.getElementById("modal-text");

    if (game === "tic-tac-toe") {
        title.textContent = "How to Play Tic-Tac-Toe";
        text.textContent = "Tic-Tac-Toe is a two-player game. Take turns placing Xs and Os on a 3x3 grid. The first to get three in a row wins!";
    } else if (game === "rock-paper-scissors") {
        title.textContent = "How to Play Rock-Paper-Scissors";
        text.textContent = "Select rock, paper, or scissors. Rock beats scissors, scissors beats paper, and paper beats rock.";
    } else if (game === "matching-game") {
        title.textContent = "How to Play Matching Game";
        text.textContent = "Select two tiles to see if they match. If they don't, the tiles will flip back. Try to match each pair as quick as you can or in the least amount of tries.";
    }

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("instruction-modal").style.display = "none";
}