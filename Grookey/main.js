let isSpinning = true;

const TAU = Zdog.TAU;
//L=Light, M=Med, D=Dark
const green = '#A7D557';
const dGreen = '4F7D08';
const orange = '#F47E26';
const yellow = '#F4E886';
const brown = '#9B0A13';
const black = '#020C03';

const illo = new Zdog.Illustration({
  element: '.zdog-canvas',
  dragRotate: true,
  zoom: 15,
  rotate: { y: -TAU / 16 },
  onDragStart: function () {
    isSpinning = false;
  },
});

// ----- model ----- //
var body = new Zdog.Hemisphere({
  addTo: illo,
  diameter: 5,
  stroke: 5,
  color: green,
  rotate: { x: TAU / 4 },
});

// ----- arm L ----- //
var armAnchor = new Zdog.Anchor({
  addTo: body,
  translate: { x: -1, y: 3, z: -1 },
  rotate: { x: -TAU / 6 },
});

var arm = new Zdog.Group({
  addTo: armAnchor,
  rotate: { x: TAU / 16, z: -TAU / 32 },
});

var upperArm = new Zdog.RoundedRect({
  addTo: arm,
  width: 0.5,
  height: 1.5,
  stroke: 2,
  cornerRadius: 1,
  fill: true,
  translate: { y: -2, z: 2 },
  color: green,
});

var hand = new Zdog.Rect({
  addTo: arm,
  width: 0.5,
  height: 1,
  stroke: 2,
  cornerRadius: 1,
  fill: true,
  translate: { z: 2 },
  color: orange,
});

var fingerLines = new Zdog.Shape({
  addTo: hand,
  path: [
    { y: -0.5 },
    { y:  0 },
  ],
  stroke: 0.2,
  color: black,
  translate: { x: 0.4, y: 1.4, z: 0.5 },
});

fingerLines.copy({
  translate: { x: -0.4, y: 1.4, z: 0.5 },
});

// ----- arm R ----- //


var armAnchorR = new Zdog.Anchor({
  addTo: body,
  translate: { x: 1, y: 2.5, z: -1 },
  rotate: { x: -TAU / 4 },
});

arm.copyGraph({
  addTo: armAnchorR,
  rotate: { x: TAU / 16, z: TAU / 32 },
});

// ----- foot ----- //

var footL = new Zdog.Anchor({
  addTo: body,
  rotate: { z: TAU / 6 },
});

var foot = new Zdog.Ellipse({
  addTo: footL,
  height: 1.5,
  width: 0.8,
  stroke: 2,
  fill: true,
  color: orange,
  translate: { y: 5, z: -1 },
  rotate: { x: TAU / 4, z: -TAU / 3 },
});

var footR = new Zdog.Anchor({
  addTo: body,
  rotate: { z: -TAU / 6 },
});

foot.copy({
  addTo: footR,
  translate: { y: 5, z: -1 },
  rotate: { x: TAU / 4, z: TAU / 3 },
});

// ----- tail ----- //

tail = new Zdog.Shape({
  addTo: body,
  path: [
    { x: 0, y: 0 },   // start
    { bezier: [
      { x:  2, y: -2 }, // start control point
      { x:  2, y:  4 }, // end control point
      { x:  5, y:  1 }, // end point
    ], },
  ],
  closed: false,
  stroke: 2,
  color: brown,
  translate: { y: -5.5 },
  rotate: { x: TAU / 4 },
  scale: 1.5,
});

// ----- ears ----- //

var ear = new Zdog.Shape({
  addTo: illo,
  path: [
    { x: 0, y: 0 },
    { x:  0, y:  2.5 },
    { arc: [
      { x: 1, y: 3.5 },
      { x:  2.5, y:  3 },
    ], },
    { arc: [
      { x: 3, y: 0 },
      { x:  0, y:  0 },
    ], },
  ],
  stroke: 1.5,
  color: brown,
  fill: true,
  translate: { x: -5.5, z: 0.5, y: -8 },
  rotate: { y: TAU / 32, z: TAU / 2, x: -TAU / 16 },
  scale: 0.7,
});

var earLine = new Zdog.Shape({
  addTo: ear,
  path: [
    { y: -1 },
    { y:  0 },
  ],
  stroke: 0.2,
  color: black,
  translate: { x: 0.4, y: 3, z: 0.5 },
  rotate: { z: -TAU / 8 },
  backface: true,
});


ear.copyGraph({
  translate: { x: 5.5, z: 0.5, y: -8 },
  rotate: { x: TAU / 2},
});



// ----- head ----- //

var head = new Zdog.Hemisphere({
  addTo: illo,
  diameter: 5,
  stroke: 7.5,
  color: green,
  translate: { y: -6, z: 0 },
  rotate: { x: TAU / 4 },
});

// ----- face ----- //

var faceGroup = new Zdog.Group({
  addTo: head,
  translate: { y: 5.5, z: -0.5 },
});

var faceL = new Zdog.Ellipse({
  addTo: illo,
  diameter: 4.5,
  stroke: 0.5,
  fill: true,
  color: yellow,
  translate: { x: -2, y: -6, z: 5.5 },
  rotate: { y: TAU / 32 },
});

var eyeL = new Zdog.Shape({
  addTo: faceL,
  path: [
    { y: -0.5 },
    { y:  -2 },
  ],
  stroke: 0.5,
  color: black,
  translate: { x: -0.1, y: 1, z: 0.5 },
});

var faceR = new Zdog.Ellipse({
  addTo: illo,
  diameter: 4.5,
  stroke: 0.5,
  fill: true,
  color: yellow,
  translate: { x: 2, y: -6, z: 5.5 },
  rotate: { y: -TAU / 32 },
});

var eyeR = new Zdog.Shape({
  addTo: faceR,
  path: [
    { y: -0.5 },
    { y:  -2 },
  ],
  stroke: 0.5,
  color: black,
  translate: { x: 0.1, y: 1, z: 0.5 },
});

var faceDivit = new Zdog.Polygon({
  addTo: faceGroup,
  sides: 3,
  stroke: 0.5,
  radius: 1,
  color: yellow,
  fill: true,
  translate: { z: 2.3 },
  rotate: { x: -TAU / 4 },
});

var nose = new Zdog.Ellipse({
  addTo: faceGroup,
  width: 1,
  height: 1.5,
  stroke: 1.8,
  fill: true,
  translate: { y: 1.5 },
  rotate: { x: TAU / 4 },
  color: orange,
});

var stick = new Zdog.Shape({
  addTo: nose,
  path: [
    { y: -2 },
    { y:  2 },
  ],
  stroke: 1,
  fill: true,
  color: brown,
  translate: { y: -1.5, z: -0.5 },
  rotate: { z: TAU / 4 },
});

var stick1 = new Zdog.Shape({
  addTo: stick,
  path: [
    { y: -1 },
    { y:  0 },
  ],
  stroke: 0.7,
  fill: true,
  color: brown,
  translate: { y: 1.3 },
  rotate: { z: TAU / 3 },
});





// ----- leaf ----- //

var LeafAnchor = new Zdog.Anchor({
  addTo: head,
  translate: { z: 9.5 },
  rotate: { x: -TAU / 4 },
});


var Leaf = new Zdog.Shape({
  addTo: LeafAnchor,
  path: [
    { x: 0, y: 0 },
    { arc: [
      { x:  1, y: 1 },
      { x:  1, y:  3.3 },
    ], },
    { arc: [
      { x:  1, y: 5 },
      { x:  0, y:  6 },
    ], },
    { arc: [
      { x:  -1, y: 5 },
      { x:  -1, y:  3.3 },
    ], },
    { arc: [
      { x:  -1, y: 1 },
      { x:  0, y:  0 },
    ], },
  ],
  stroke: 0.5,
  fill: true,
  color: green,
  closed: true,
  scale: { y: 0.75 },
  rotate: { z: TAU / 8, y: TAU / 16 },
  translate: { x: 3.4 },
});

var leafLine = new Zdog.Shape({
  addTo: Leaf,
  path: [
    { y: 4.5 },
    { y:  5.5 },
  ],
  stroke: 0.2,
  color: black,
  translate: { z: 0.3 },
  backface: true,
});

Leaf.copyGraph({
  rotate: { z: -TAU / 8, y: -TAU / 32 },
  translate: { x: -3.4, z: -0.5 },
});

function animate() {
  illo.rotate.x += 0.03;
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}

animate();
