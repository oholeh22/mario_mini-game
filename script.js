document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const mashroom = document.getElementById('mashroom');
    const btn = document.querySelector('.start');
    const scoreDisplay = document.getElementById('score');
    const instructions = document.querySelector('.instructions'); 
  
    let isStart = false;
    let interval;
    let score = 0;
    let hasPassed = false; 
  
    const updateScore = () => {
      score++;
      if (scoreDisplay) {
        scoreDisplay.textContent = `Score: ${score}`;
      }
    };
  
    const activeJump = (e) => {
      if (isStart && e.keyCode === 38) {
        if (!player.classList.contains('active')) {
          player.classList.add('active');
        }
        setTimeout(() => {
          player.classList.remove('active');
        }, 300);
      }
    };
  
    const startGame = () => {
      isStart = true;
      score = 0;
      if (scoreDisplay) {
        scoreDisplay.textContent = `Score: ${score}`; 
      }
      hasPassed = false; 
      mashroom.classList.add('animate');
      if (instructions) {
        instructions.textContent = 'Press Up Arrow to Jump!'; 
      }
  
      interval = setInterval(() => {
        let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
        let mashroomLeft = parseInt(window.getComputedStyle(mashroom).getPropertyValue('left'));
  
        if (mashroomLeft < 50 && mashroomLeft > 0 && playerTop >= 140) {
          endGame(); 
        }
  
        if (mashroomLeft < 50 && mashroomLeft > 0 && !hasPassed && playerTop < 140) {
          console.log('Successful jump, increasing score');
          updateScore(); 
          hasPassed = true; 
        }
      }, 10); 
    };
  
    mashroom.addEventListener('animationiteration', () => {
      console.log('Animation iteration triggered');
      hasPassed = false; 
    });
  
    const endGame = () => {
      isStart = false;
      clearInterval(interval);
      mashroom.classList.remove('animate');
      alert('GAME OVER!');
      score = 0; 
      if (scoreDisplay) {
        scoreDisplay.textContent = `Score: ${score}`; 
      }
      if (instructions) {
        instructions.textContent = 'Game Over! Press Start to Play Again'; 
      }
    };
  
    document.addEventListener('keydown', activeJump); 
    btn.addEventListener('click', () => {
      startGame();
    });
  });
  