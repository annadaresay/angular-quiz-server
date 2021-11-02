// Library used for face detection: https://github.com/justadudewhohacks/face-api.js/

import "@tensorflow/tfjs-node";
import * as canvas from "canvas";
import * as faceapi from "face-api.js";
import fetch from "node-fetch";

// Simulate some browser features
const { Canvas, Image } = canvas.default;
faceapi.env.monkeyPatch({
  Canvas,
  Image,
});

// Setup face detector (using lightweight model "Tiny Face Detector")
const options = new faceapi.TinyFaceDetectorOptions({
  inputSize: 512,
  scoreThreshold: 0.5,
});
await faceapi.nets.tinyFaceDetector.loadFromDisk("./weights");

const getImageBuffer = async (imageUrl) => {
  const response = await fetch(imageUrl);
  const buffer = await response.buffer();

  return buffer;
};

export const getFaceData = async (url) => {
  const input = new Image();
  input.src = await getImageBuffer(url);

  const faceData = await faceapi.detectSingleFace(input, options);

  return {
    faceData,
  };
};
