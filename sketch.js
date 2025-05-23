let video;
let facemesh;
let predictions = [];
const indices = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];
const indices2 = [76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184];

// 新增左眼與右眼索引
const leftEye1 = [243,190,56,28,27,29,30,247,130,25,110,24,23,22,26,112];
const leftEye2 = [133,173,157,158,159,160,161,246,33,7,163,144,145,153,154,155];
const rightEye1 = [359,467,260,259,257,258,286,414,463,341,256,252,253,254,339,255];
const rightEye2 = [263,466,388,387,386,385,384,398,362,382,381,380,374,373,390,249];

function setup() {
  createCanvas(640, 480).position(
    (windowWidth - 640) / 2,
    (windowHeight - 480) / 2
  );
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', results => {
    predictions = results;
  });
}

function modelReady() {
  // 模型載入完成，可選擇顯示訊息
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 嘴唇
    stroke(255, 0, 0);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape();

    stroke(255, 0, 0);
    strokeWeight(2);
    fill(255, 255, 0, 200); // 半透明黃色
    beginShape();
    for (let i = 0; i < indices2.length; i++) {
      const idx = indices2[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape(CLOSE);

    fill(0, 255, 0, 150); // 半透明綠色
    noStroke();
    beginShape();
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    for (let i = indices2.length - 1; i >= 0; i--) {
      const idx = indices2[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape(CLOSE);

    // 左眼
    stroke(255, 0, 0);
    strokeWeight(2);
    fill(0, 128, 255, 120); // 半透明藍色
    beginShape();
    for (let i = 0; i < leftEye1.length; i++) {
      const idx = leftEye1[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    for (let i = leftEye2.length - 1; i >= 0; i--) {
      const idx = leftEye2[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape(CLOSE);

    // 右眼
    stroke(255, 0, 0);
    strokeWeight(2);
    fill(0, 128, 255, 120); // 半透明藍色
    beginShape();
    for (let i = 0; i < rightEye1.length; i++) {
      const idx = rightEye1[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    for (let i = rightEye2.length - 1; i >= 0; i--) {
      const idx = rightEye2[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
