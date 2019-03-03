let canvas;
let context;
let previousColorElement;
let isDrawing = false;
let previousThicknessElement;
let changeColorTarget = document.querySelector('.choose-color');
let changeSizeTarget = document.querySelector('.choose-width');
let clearBtn = document.querySelector('.clear-btn');
let saveBtn = document.querySelector('.save-btn');

window.onload = function () {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  canvas.onmousedown = startDrawing;
  canvas.onmouseup = stopDrawing;
  canvas.onmouseout = stopDrawing;
  canvas.onmousemove = draw;
  loadLastCanvas();
}


function changeColor(color) {
  context.strokeStyle = color;
}

function changeThickness(thickness) {
  context.lineWidth = thickness;
}

function startDrawing(e) {
  isDrawing = true;
  context.beginPath();
  context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
}

function draw(e) {
  if (isDrawing == true) {
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    context.lineTo(x, y);
    context.stroke();
  }
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
  localStorage.setItem('img', canvas.toDataURL());
}

function loadLastCanvas() {
  let saveImg = new Image();
  let sessionImg = new Image();
  saveImg.src = localStorage.getItem('img');
  sessionImg.src = sessionStorage.getItem('sessionImg');
  saveImg.onload = function () {
    context.drawImage(saveImg, 0, 0);
  }
  sessionImg.onload = function () {
    context.drawImage(sessionImg, 0, 0);
  }
};

function stopDrawing() {
  isDrawing = false;
  sessionStorage.setItem('sessionImg', canvas.toDataURL());
};

window.onblur = function () {
  window.onfocus = function () {
    location.reload(true)
  }
};

changeColorTarget.addEventListener('click', function (e) {
  const colorAttribute = e.target.getAttribute('data-color');
  changeColor(colorAttribute);
});

changeSizeTarget.addEventListener('click', function (e) {
  const sizeAttribute = e.target.getAttribute('data-size');
  changeThickness(Number(sizeAttribute));
});

clearBtn.addEventListener('click', function (e) {
  clearCanvas();
});

saveBtn.addEventListener('click', function (e) {
  saveCanvas();
});