import { SNAKE_SPEED, update as updateSnake, render as renderSnake, getHeadOfSnake, snakeIntersection } from './snake.js'
import { update as updatePrey, render as renderPrey } from './prey.js'
import { outsideGrid } from './grid.js'
let lastRenderTime = 0
let gameOver = false
const back_box = document.getElementById('back_box');
function main(currentTime) {
  if (gameOver) {
    let score = parseInt(document.getElementById('your_score').innerHTML)
    if (localStorage.getItem('high_score') < score) {
      localStorage.setItem('high_score', score);
    }
    if (confirm('Game Over. Press Ok to restart.')) {
      window.location = '/'
    }
    return
  }
  var highScore = localStorage.getItem('high_score');
  document.getElementById('high_score').innerHTML = highScore
  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
  lastRenderTime = currentTime;
  // console.log(secondsSinceLastRender);

  update();
  render();
}
window.requestAnimationFrame(main)

function update() {
  updateSnake();
  updatePrey();
  checkForDeath();
}

function render() {
  back_box.innerHTML = ''
  renderSnake(back_box);
  renderPrey(back_box)
}

function checkForDeath() {
  gameOver = outsideGrid(getHeadOfSnake()) || snakeIntersection()
}

