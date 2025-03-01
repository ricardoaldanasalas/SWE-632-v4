document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    let cells = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    
    function renderBoard() {
        board.innerHTML = "";
        cells.forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.textContent = cell;
            cellElement.addEventListener("click", () => handleMove(index));
            board.appendChild(cellElement);
        });
    }
    
    function handleMove(index) {
        if (cells[index] === "") {
            cells[index] = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            renderBoard();
        }
    }

    function restartGame() {
        cells = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        renderBoard();
    }
    
    renderBoard();
});