// Structure Builder using p5.js
// Grid and brick settings
const BRICK_WIDTH = 40;
const BRICK_HEIGHT = 20;
const GRID_COLS = 30;
const GRID_ROWS = 25;

// State variables
let grid = [];
let currentBrick = 'red';
let currentTool = 'place';
let brickColors = {
  red: '#C45847',
  brown: '#8B4513',
  gray: '#808080',
  white: '#F5F5DC',
  wood: '#D2691E',
  roof: '#8B0000',
  window: '#87CEEB',
  door: '#654321'
};

function setup() {
  let canvas = createCanvas(GRID_COLS * BRICK_WIDTH, GRID_ROWS * BRICK_HEIGHT);
  canvas.parent('canvasContainer');
  
  // Initialize empty grid
  initializeGrid();
  
  // Setup button listeners
  setupButtonListeners();
  
  // Draw initial state
  drawGrid();
}

function initializeGrid() {
  grid = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    grid[row] = [];
    for (let col = 0; col < GRID_COLS; col++) {
      grid[row][col] = null;
    }
  }
}

function draw() {
  // Drawing happens on demand via drawGrid()
}

function mousePressed() {
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    let col = floor(mouseX / BRICK_WIDTH);
    let row = floor(mouseY / BRICK_HEIGHT);
    
    if (col >= 0 && col < GRID_COLS && row >= 0 && row < GRID_ROWS) {
      if (currentTool === 'place') {
        grid[row][col] = currentBrick;
      } else if (currentTool === 'erase') {
        grid[row][col] = null;
      }
      drawGrid();
    }
  }
}

function mouseDragged() {
  mousePressed(); // Allow dragging to place/erase multiple bricks
}

function drawGrid() {
  // Background
  background('#E8F4F8');
  
  // Draw grid lines
  stroke(200);
  strokeWeight(0.5);
  for (let i = 0; i <= GRID_COLS; i++) {
    line(i * BRICK_WIDTH, 0, i * BRICK_WIDTH, height);
  }
  for (let i = 0; i <= GRID_ROWS; i++) {
    line(0, i * BRICK_HEIGHT, width, i * BRICK_HEIGHT);
  }
  
  // Draw bricks
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      if (grid[row][col] !== null) {
        drawBrick(col, row, grid[row][col]);
      }
    }
  }
}

function drawBrick(col, row, brickType) {
  let x = col * BRICK_WIDTH;
  let y = row * BRICK_HEIGHT;
  let color = brickColors[brickType];
  
  // Draw brick fill
  fill(color);
  stroke(0);
  strokeWeight(1);
  rect(x + 1, y + 1, BRICK_WIDTH - 2, BRICK_HEIGHT - 2, 2);
  
  // Add texture/details based on brick type
  noStroke();
  
  if (brickType === 'window') {
    // Window panes
    fill(100, 150, 200, 150);
    rect(x + 5, y + 3, BRICK_WIDTH / 2 - 7, BRICK_HEIGHT - 6);
    rect(x + BRICK_WIDTH / 2 + 2, y + 3, BRICK_WIDTH / 2 - 7, BRICK_HEIGHT - 6);
    stroke(50);
    strokeWeight(2);
    line(x + BRICK_WIDTH / 2, y + 3, x + BRICK_WIDTH / 2, y + BRICK_HEIGHT - 3);
    line(x + 5, y + BRICK_HEIGHT / 2, x + BRICK_WIDTH - 5, y + BRICK_HEIGHT / 2);
  } else if (brickType === 'door') {
    // Door handle
    fill(200, 180, 100);
    ellipse(x + BRICK_WIDTH - 8, y + BRICK_HEIGHT / 2, 4, 4);
    // Door panels
    stroke(50);
    strokeWeight(1);
    noFill();
    rect(x + 4, y + 3, BRICK_WIDTH - 8, BRICK_HEIGHT / 2 - 4);
    rect(x + 4, y + BRICK_HEIGHT / 2 + 1, BRICK_WIDTH - 8, BRICK_HEIGHT / 2 - 4);
  } else if (brickType === 'roof') {
    // Roof tiles pattern
    fill(0, 0, 0, 30);
    for (let i = 0; i < 3; i++) {
      rect(x + 2 + i * 12, y + 2, 10, BRICK_HEIGHT - 4, 0, 0, 5, 5);
    }
  } else {
    // Regular brick mortar lines
    fill(0, 0, 0, 20);
    rect(x + 2, y + BRICK_HEIGHT / 2 - 1, BRICK_WIDTH - 4, 2);
  }
}

function setupButtonListeners() {
  // Brick selection buttons
  let brickButtons = document.querySelectorAll('.brick-btn');
  brickButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      brickButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentBrick = this.getAttribute('data-brick');
      currentTool = 'place';
      updateToolButtons();
    });
  });
  
  // Tool buttons
  document.getElementById('placeTool').addEventListener('click', function() {
    currentTool = 'place';
    updateToolButtons();
  });
  
  document.getElementById('eraseTool').addEventListener('click', function() {
    currentTool = 'erase';
    updateToolButtons();
  });
  
  document.getElementById('clearBtn').addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all bricks?')) {
      initializeGrid();
      drawGrid();
    }
  });
  
  // Action buttons
  document.getElementById('saveBtn').addEventListener('click', saveStructure);
  document.getElementById('loadBtn').addEventListener('click', loadStructure);
  document.getElementById('exportBtn').addEventListener('click', exportImage);
  
  // Quick structure buttons
  document.getElementById('simpleHouse').addEventListener('click', buildSimpleHouse);
  document.getElementById('largeHouse').addEventListener('click', buildLargeHouse);
  document.getElementById('tower').addEventListener('click', buildTower);
}

function updateToolButtons() {
  document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  if (currentTool === 'place') {
    document.getElementById('placeTool').classList.add('active');
  } else if (currentTool === 'erase') {
    document.getElementById('eraseTool').classList.add('active');
  }
}

function saveStructure() {
  let structureData = JSON.stringify(grid);
  localStorage.setItem('savedStructure', structureData);
  alert('Structure saved successfully!');
}

function loadStructure() {
  let structureData = localStorage.getItem('savedStructure');
  if (structureData) {
    grid = JSON.parse(structureData);
    drawGrid();
    alert('Structure loaded successfully!');
  } else {
    alert('No saved structure found!');
  }
}

function exportImage() {
  saveCanvas('my-structure', 'png');
  alert('Image exported successfully!');
}

// Quick structure templates
function buildSimpleHouse() {
  initializeGrid();
  
  // Foundation
  for (let col = 8; col < 22; col++) {
    grid[20][col] = 'gray';
  }
  
  // Walls
  for (let row = 15; row < 20; row++) {
    grid[row][8] = 'red';
    grid[row][21] = 'red';
  }
  for (let col = 9; col < 21; col++) {
    grid[19][col] = 'red';
    grid[15][col] = 'red';
  }
  
  // Fill walls with bricks
  for (let row = 16; row < 19; row++) {
    for (let col = 9; col < 21; col++) {
      grid[row][col] = 'red';
    }
  }
  
  // Door
  grid[17][14] = 'door';
  grid[18][14] = 'door';
  grid[17][15] = 'door';
  grid[18][15] = 'door';
  
  // Windows
  grid[17][10] = 'window';
  grid[17][11] = 'window';
  grid[17][18] = 'window';
  grid[17][19] = 'window';
  
  // Roof
  for (let i = 0; i < 7; i++) {
    for (let col = 8 + i; col < 22 - i; col++) {
      grid[14 - i][col] = 'roof';
    }
  }
  
  drawGrid();
}

function buildLargeHouse() {
  initializeGrid();
  
  // Foundation
  for (let col = 5; col < 25; col++) {
    grid[22][col] = 'gray';
  }
  
  // Main walls
  for (let row = 12; row < 22; row++) {
    for (let col = 5; col < 25; col++) {
      grid[row][col] = 'brown';
    }
  }
  
  // Windows - first floor
  for (let col of [8, 9, 15, 16, 20, 21]) {
    grid[18][col] = 'window';
    grid[19][col] = 'window';
  }
  
  // Windows - second floor
  for (let col of [8, 9, 15, 16, 20, 21]) {
    grid[14][col] = 'window';
    grid[15][col] = 'window';
  }
  
  // Door
  for (let row = 18; row < 22; row++) {
    grid[row][12] = 'door';
    grid[row][13] = 'door';
  }
  
  // Roof
  for (let i = 0; i < 10; i++) {
    for (let col = 5 + i; col < 25 - i; col++) {
      grid[11 - i][col] = 'roof';
    }
  }
  
  drawGrid();
}

function buildTower() {
  initializeGrid();
  
  // Base
  for (let col = 12; col < 18; col++) {
    grid[23][col] = 'gray';
    grid[22][col] = 'gray';
  }
  
  // Tower body
  for (let row = 8; row < 22; row++) {
    grid[row][12] = 'gray';
    grid[row][17] = 'gray';
    for (let col = 13; col < 17; col++) {
      grid[row][col] = 'gray';
    }
  }
  
  // Windows at different levels
  for (let row of [10, 14, 18]) {
    grid[row][14] = 'window';
    grid[row][15] = 'window';
  }
  
  // Top battlements
  for (let col = 12; col < 18; col++) {
    grid[7][col] = 'gray';
  }
  for (let col of [12, 14, 16, 17]) {
    grid[6][col] = 'gray';
    grid[5][col] = 'gray';
  }
  
  // Roof
  for (let i = 0; i < 3; i++) {
    for (let col = 13 + i; col < 17 - i; col++) {
      grid[4 - i][col] = 'roof';
    }
  }
  
  drawGrid();
}
