const board = document.getElementById("board");
const sizeInput = document.getElementById("input-size");
const sizeBtn = document.getElementById("set-size-btn");

const cleanBtn = document.getElementById("clean-btn");
const blackBtn = document.getElementById("black-btn");
const eraserBtn = document.getElementById("eraser-btn");
const randomBtn = document.getElementById("random-btn");

const textError = document.getElementById("text-error");

let color = "black";
let painting = false;

function createBoard(size) {
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  let squares = board.querySelectorAll("div");
  squares.forEach((div) => {
    div.remove();
  });

  let amount = size * size;
  for (let i = 0; i < amount; i++) {
    let square = document.createElement("div");
    square.addEventListener("mouseover", colorSquare);
    square.classList.add("square");
    board.insertAdjacentElement("beforeend", square);
  }
}

createBoard(16);
function colorSquare() {
  if (painting) {
    if (color == "random") {
      this.style.backgroundColor = getRandomRgb();
    } else {
      this.style.backgroundColor = color;
    }
  }
}

function colorPicker(picket) {
  color = picket;
}
function getRandomRgb() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = (num >> 8) & 255;
  var b = num & 255;
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

blackBtn.addEventListener("click", () => {
  colorPicker("black");
  blackBtn.classList.add("active");
  eraserBtn.classList.remove("active");
  randomBtn.classList.remove("active");
});
eraserBtn.addEventListener("click", () => {
  colorPicker("white");
  blackBtn.classList.remove("active");
  eraserBtn.classList.add("active");
  randomBtn.classList.remove("active");
});
randomBtn.addEventListener("click", () => {
  colorPicker("random");
  blackBtn.classList.remove("active");
  eraserBtn.classList.remove("active");
  randomBtn.classList.add("active");
});

sizeBtn.addEventListener("click", () => {
  if (sizeInput.value < 2 || sizeInput.value > 100) {
    textError.innerText = "The board only accepts numbers between 2 and 100";
    textError.style.color = "red";
    return;
  }
  textError.innerText = "";
  createBoard(sizeInput.value);
});

cleanBtn.addEventListener("click", () => {
  let squares = board.querySelectorAll("div");
  squares.forEach((div) => {
    div.style.backgroundColor = "white";
  });
});

document.querySelector("body").addEventListener("mousedown", () => {
  painting = true;
});

document.querySelector("body").addEventListener("mouseup", () => {
  painting = false;
});
