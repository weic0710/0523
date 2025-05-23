let video;
let facemesh;
let predictions = [];
const points = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];

function setup() {
  createCanvas(640, 480);
  // 致中畫布
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', gotResults);
}

function modelReady() {
  // ...existing code...
}

function gotResults(results) {
  predictions = results;
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    let keypoints = predictions[0].scaledMesh;
    stroke(255, 0, 0);
    strokeWeight(2);
    noFill();
    for (let i = 0; i < points.length - 1; i++) {
      let a = keypoints[points[i]];
      let b = keypoints[points[i + 1]];
      if (a && b) {
        line(a[0], a[1], b[0], b[1]);
      }
    }
  }
}
