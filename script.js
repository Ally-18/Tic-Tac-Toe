// Page Switching
function showPage(id) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      page.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
  }
  
  // Tic-Tac-Toe Logic
  let currentPlayer = 'X';
  let board = Array(9).fill('');
  let gameActive = true;
  
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  
  function createBoard() {
    const boardEl = document.getElementById('board');
    boardEl.innerHTML = '';
    board.forEach((cell, index) => {
      const cellEl = document.createElement('div');
      cellEl.textContent = cell;
      cellEl.addEventListener('click', () => handleMove(index));
      boardEl.appendChild(cellEl);
    });
    updateStatus();
  }
  
  function handleMove(index) {
    if (board[index] !== '' || !gameActive) return;
  
    board[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    createBoard();
  }
  
  function checkWinner() {
    for (const combo of winCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        document.getElementById('game-status').textContent = `${board[a]} wins!`;
        gameActive = false;
        return;
      }
    }
  
    if (!board.includes('')) {
      document.getElementById('game-status').textContent = `It's a draw!`;
      gameActive = false;
    }
  }
  
  function resetGame() {
    currentPlayer = 'X';
    board = Array(9).fill('');
    gameActive = true;
    document.getElementById('game-status').textContent = '';
    createBoard();
  }
  
  // Initialize board when page loads
  document.addEventListener('DOMContentLoaded', () => {
    createBoard();
  });