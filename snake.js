import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 10;
const snakeBody = [{ x: 11, y: 11 }]
let newSegment = 0;
export function update() {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function render(back_box) {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y
    snakeElement.style.gridColumnStart = segment.x
    snakeElement.classList.add('snake-body')
    back_box.appendChild(snakeElement);
  });
}
export function onSnake(prey, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index == 0) return false;
    return equalPositions(segment, prey)
  })
}
export function expandSnake(rate) {
  let score = parseInt(document.getElementById('your_score').innerHTML)
  document.getElementById('your_score').innerHTML = score + rate * 10;
  newSegment += rate
}
export function getHeadOfSnake() {
  return snakeBody[0]
}
export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true })
}
function equalPositions(segment, prey) {
  return segment.x === prey.x && segment.y === prey.y
}
function addSegments() {
  for (let i = 0; i < newSegment; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }
  newSegment = 0;
}