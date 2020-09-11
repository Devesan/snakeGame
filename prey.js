import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'
let prey = getRandomPreyPosition();
const SNAKE_GROWTH_RATE = 1;
export function update() {
  if (onSnake(prey)) {
    expandSnake(SNAKE_GROWTH_RATE);
    prey = getRandomPreyPosition();
  }
}

export function render(back_box) {
  const preyElement = document.createElement('div');
  preyElement.style.gridRowStart = prey.y
  preyElement.style.gridColumnStart = prey.x
  preyElement.classList.add('prey')
  back_box.appendChild(preyElement);
}

function getRandomPreyPosition() {
  let newPreyPosition;
  while (newPreyPosition == null || onSnake(newPreyPosition)) {
    newPreyPosition = randomGridPosition();
  }
  return newPreyPosition
}