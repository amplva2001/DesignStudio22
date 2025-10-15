function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); // We only need to draw this once
  drawDecorativeBar();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawDecorativeBar();
}

function drawDecorativeBar() {
  // Array of colors from top to bottom (sampled from your image, adjust as needed)
  let colors = [
    '#f8f58d',
    '#f5f47a',
    '#ebe45e',
    '#d1c54f',
    '#b6a63e',
    '#998631',
    '#7d6926'
  ];
  let barHeight = 20; // Height of each color bar

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    noStroke();
    rect(0, i * barHeight, width, barHeight);
  }
}