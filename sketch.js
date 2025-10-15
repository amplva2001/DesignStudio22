function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0); // Makes the canvas black before drawing the bars
  noLoop(); // We only need to draw this once
  drawDecorativeBar();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawDecorativeBar();
}

function drawDecorativeBar() {
  // Array of colors from top to bottom
  let colors = [
    '#F8F8A0',
    '#D8D858',
    '#B8B848',
    '#989838',
    '#787830',
    '#585820',
    '#383810',
    '#252505'
  ];
  let barHeight = 20; // Height of each color bar

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i] + '99'); // Add alpha for semi-transparency if you want, e.g. '99' at the end for ~60% opacity
    noStroke();
    rect(0, i * barHeight, width, barHeight);
  }
}