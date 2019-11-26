let isSpinning = true;

const TAU = Zdog.TAU;
//L=Light, M=Med, D=Dark
const yellow = '#F2CB6F';
const mOrange = '#F37934';
const dOrange = '#8B370A';
const lOrange = '#F4B087';
const white = '#FEFFFF';
const offWhite = '#FFF6E1';
const black = '#000A16';

const illo = new Zdog.Illustration({
  element: '.zdog-canvas',
  dragRotate: true,
  zoom: 15,
  //rotate: { y: -TAU / 6 },
  // rotate: {y: -TAU/6, x:-TAU/32},
  onDragStart: function () {
    isSpinning = false;
  },
});

// ----- model ----- //
var body = new Zdog.Ellipse({
  addTo: illo,
  width: 2,
  height: 1.5,
  stroke: 10,
  color: white,
  rotate: { x: TAU / 4 },
});

// ----- tail ----- //
var tail = new Zdog.Shape({
  addTo: body,
  stroke: 5,
  color: white,
  translate: { y: -5.5, z: -3 },
});

// ----- feet ----- //

var foot = new Zdog.Group({
  addTo: body,
  translate: { x: -4, y: 5, z: 0.5 },
  scale: { x: 0.5, y: 0.7 },
  rotate: { x: -TAU / 4, z: -TAU / 32, y: -TAU / 32 },
});

var footTop = new Zdog.Shape({
  addTo: foot,
  path: [
      { x: -1, y: 1 },
      { arc: [
        { x: -1, y: -0.5 },
        { x: 0, y: -0.5 },
      ], },
      { arc: [
        { x: 1, y: -0.5 },
        { x: 1, y: 1 },
      ], },
  ],
  stroke: 3,
  fill: true,
  color: mOrange,
  closed: true,
});

var toeLines = new Zdog.Shape({
  addTo: footTop,
  path: [
    { y: -1 },
    { y:  0 },
  ],
  stroke: 0.2,
  color: black,
  translate: { x: 0.9, y: -1 },
});

toeLines.copy({
  translate: { x: -0.9, y: -0.5 },
});

var footBottom = new Zdog.Shape({
  addTo: foot,
  translate: { y: 1 },
  path: [
      { x: -1, y: 1 },
      { arc: [
        { x: -1, y: 4 },
        { x: 0, y: 4 },
      ], },
      { arc: [
        { x: 1, y: 4 },
        { x: 1, y: 1 },
      ], },
  ],
  stroke: 3,
  fill: true,
  color: white,
  closed: true,
  rotate: { x: TAU / 32 },
});

var footBandage = new Zdog.RoundedRect({
  addTo: footBottom,
  width: 4.5,
  height: 1.5,
  cornerRadius: 1,
  stroke: 0.1,
  fill: true,
  color: yellow,
  backface: false,
  translate: { y: 0.8, z: 1.3 },
});


foot.copyGraph({
  translate: { x: 4, y: 5, z: 0.5 },
  rotate: { x: -TAU / 4, z: TAU / 32, y: TAU / 32 },
});

// ----- arms ----- //

var arms = new Zdog.Anchor({
  addTo: body,
  rotate: { x: TAU / 8, z: TAU / 8 }, //rotates arms around center body
});

var armsGroup = new Zdog.Group({
  addTo: arms,
  translate: { y: 5.5 },
  rotate: { x: -TAU / 4 }, //rotates arms away from center of body
  scale: 1.5,
});

var arm = new Zdog.Cone({
  addTo: armsGroup,
  diameter: 1,
  length: 1.5,
  stroke: 1,
  color: white,
});

var shoulder = new Zdog.Shape({
  addTo: armsGroup,
  stroke: 2,
  color: white,
});

arms.copyGraph({
  rotate: { x: TAU / 8, z: -TAU / 8 },
});

var neck = new Zdog.Shape({
  addTo: illo,
  path: [
  { x: 0, y: 0 },
  { arc: [
    { x: -1, y: 1.5 },
    { x: 0.5, y: 2 },
  ], },
],
  closed: false,
  stroke: 1,
  color: mOrange,
  rotate: { x: -TAU / 4, z: TAU / 6 },
  translate: { x: -2, y: -3.5, z: 3.5 },
});

neck.copy({
  rotate: { x: TAU / 4, z: 2 * TAU / 3 },
  translate: { x: 2, y: -3.5, z: 3.5 },
});

// ----- head ----- //

var head = new Zdog.Hemisphere({
  addTo: illo,
  diameter: 5,
  stroke: 7.5,
  color: white,
  translate: { y: -6, z: 0 },
  rotate: { x: TAU / 3 },
});

var faceGroup = new Zdog.Group({
  addTo: head,
  translate: { y: 5.5, z: -0.5 },
});

var eye = new Zdog.Shape({
  addTo: faceGroup,
  path: [
    { z: 0 },
    { z:  -1 },
  ],
  stroke: 0.5,
  color: black,
  translate: { x: -2 },
});

eye.copy({
  translate: { x: 2 },
});

var nose = new Zdog.Polygon({
  addTo: faceGroup,
  radius: 0.2,
  sides: 3,
  stroke: 0.2,
  fill: true,
  color: dOrange,
  rotate: { x: TAU / 4 },
  translate: { z: -0.5 },
});

var noseLine = new Zdog.Shape({
  addTo: nose,
  path: [
    { z: 0 },
    { z:  -0.5 },
  ],
  stroke: 0.1,
  color: dOrange,
  rotate: { x: -TAU / 4 },
  translate: { y: -0.2 },
});

var noseBandage = new Zdog.Ellipse({
  addTo: faceGroup,
  width: 1.5,
  height: 0.3,
  stroke: 0.2,
  fill: true,
  color: yellow,
  rotate: { x: TAU / 4 },
  translate: { z: 0.1 },
});

// noseBandage.copy({
//   color: lOrange,
//   fill: false,
// });

// ----- cheek fluff ----- //

var cheekAnchor = new Zdog.Anchor({
  addTo: head,
  rotate: { z: TAU / 4 },
});

var cheek = new Zdog.Group({
  addTo: cheekAnchor,
  translate: { y: -4.8, z: 1.4, x: 2 },
  rotate: { x: TAU / 4 },
});

var cheekLow = new Zdog.Cone({
  addTo: cheek,
  diameter: 1.5,
  length: 1.6,
  stroke: 1.5,
  color: white,
});

var cheekHigh = new Zdog.Cone({
  addTo: cheek,
  diameter: 1.8,
  length: 1.2,
  stroke: 1.5,
  color: white,
  translate: { y: -2.5 },
  rotate: { x: TAU / 32 },
});

cheekAnchor.copyGraph({
  rotate: { z: -3 * TAU / 8 },
});


// ----- ears ----- //

var earBasePnt = new Zdog.Anchor({
  addTo: head,
  translate: { x: -2, y: 2, z: 11.5 },
  rotate: { x: -TAU / 4 },
});

var earFluff = new Zdog.Ellipse({
  addTo: head,
  width: 0.7,
  height: 1.7,
  color: white,
  fill: true,
  stroke: 0.5,
  translate: { x: 2, y: 2, z: 6.5 },
  rotate: { x: TAU / 8, z: -TAU / 8 },
});

var earAnchor = new Zdog.Anchor({
  addTo: earBasePnt,
  translate: { x: -4 },
  rotate: { z: -TAU / 8, y: -TAU / 32 },
});

var earTop = new Zdog.Shape({
  addTo: earAnchor,
  path: [
      { x: -1.5, y: 3 },
      { arc: [
        { x: -1.5, y: 1 },
        { x: 0, y: 0 },
      ], },
      { arc: [
        { x: 1.5, y: 1 },
        { x: 1.5, y: 3 },
      ], },
  ],
  stroke: 1,
  fill: true,
  color: mOrange,
  closed: true,
});

var earMiddle = new Zdog.Shape({
  addTo: earAnchor,
  path: [
      { x: -1.5, y: 3.5 },
      { x: 1.5, y: 3.5 },
  ],
  stroke: 1,
  fill: true,
  color: lOrange,
  closed: true,
});

var earBottom = new Zdog.Shape({
  addTo: earAnchor,
  translate: { y: 1 },
  path: [
      { x: -1.5, y: 3 },
      { arc: [
        { x: -1.5, y: 5 },
        { x: 0, y: 7 },
      ], },
      { arc: [
        { x: 1.5, y: 5 },
        { x: 1.5, y: 3 },
      ], },
  ],
  stroke: 1,
  fill: true,
  color: white,
  closed: true,
});

var innerEarGroup = new Zdog.Group({
  addTo: earAnchor,
  translate: { y: 3.5, z: 0.6 },
  scale: { x: 0.4, y: 0.5 },
});

var earInner = new Zdog.Shape({
  addTo: innerEarGroup,
  path: [
    { x: 0, y: 0 },
    { arc: [
      { x:  1, y: 1 },
      { x:  1, y:  3 },
    ], },
    { arc: [
      { x:  1, y: 5 },
      { x:  0, y:  7 },
    ], },
    { arc: [
      { x:  -1, y: 5 },
      { x:  -1, y:  3 },
    ], },
    { arc: [
      { x:  -1, y: 1 },
      { x:  0, y:  0 },
    ], },
  ],
  stroke: 0.5,
  fill: true,
  color: yellow,
  closed: true,
});

earAnchor.copyGraph({
  translate: { x: 4 , y: -2.3 },
  rotate: { z: TAU / 32, y: TAU / 32 },
});





function animate() {
  //illo.rotate.y += 0.03;
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}

animate();
