function setup() {
  background(0); // Makes the canvas black before drawing the bars
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
    '#F8F8A0',
    '#D8D858',
    '#B8B848',
    '#989838',
    '#787830',
    '#585820',
    '#383810'
  ];
  let barHeight = 20; // Height of each color bar

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    noStroke();
    rect(0, i * barHeight, width, barHeight);
  }
}