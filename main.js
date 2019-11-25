let isSpinning = true;

const TAU = Zdog.TAU;
//L=Light, M=Med, D=Dark
const lBlue = '#D3F3FF';
const mBlue = '#6AC5EF';
const dBlue = '#1B7ABC';
const lRed = '#F07A88';
const dRed = '#9B0A13';
const yellow = '#F6E686';
const black = '#000A16';

const illo = new Zdog.Illustration({
  element: '.zdog-canvas',
  dragRotate: true,
  zoom: 15,
  rotate: {y: -TAU/6, x:-TAU/32},

  onDragStart: function() {
  isSpinning = false;
},

});

// ----- model ----- //
var body = new Zdog.Shape({
  addTo: illo,
  path: [{x: -.5}, {x: .5}],
  stroke: 7,
  color: mBlue,
});


var stomach = new Zdog.RoundedRect({
  addTo: body,
  width: 5,
  height: 4,
  stroke: 1,
  cornerRadius: 2.4,
  color: lBlue,
  fill: true,
  translate: {y: -1, z:3},
  rotate: {x:TAU/16},
});

// ----- foot ----- //

var foot = new Zdog.Ellipse({
  addTo: body,
  width: 1,
  height: 4,
  stroke: 1.5,
  color: mBlue,
  fill: true,
  translate: {x:-2 , y:3},
  rotate: {x:TAU/4, z:TAU/10, y:TAU/32},
});

foot.copy({
  translate: {x:2 , y:3},
  rotate: {x:3*TAU/4, z:TAU/10, y:TAU/32},
});

// ----- arms ----- //

var armGroup = new Zdog.Group({
  addTo: body,
  rotate: {x: -TAU/8, y: TAU/8, z:TAU/8},
  translate: {x: 3.5, z: 5, y:-3},
});

var arm = new Zdog.Shape({
  addTo: armGroup,
  path: [
    { x: 0, y: 0 },   // start
    { arc: [
      { x:  1.5, y: 0.5 }, // corner
      { x:  2, y:  2 }, // end point
    ]},
  ],
  closed: false,
  stroke: 1,
  color: dBlue,
});

//hands
arm.copy({
  rotate: {z: 3*TAU/8},
  scale: 0.7,
});

arm.copy({
  rotate: {x: -TAU/2},
  scale: 0.7,
});

//left arm & decendents
armGroup.copyGraph({
  addTo: body,
  translate: {x: -3.5, z: 5, y:-3},
  rotate: {x: -TAU/8, y: 3*TAU/8, z:TAU/8},


});



// ----- tail ----- //


var tailAnchor = new Zdog.Group({
  addTo: body,
  scale: 1.2,
  translate: {x: 2, y: 1, z: -6},
  rotate: {x:TAU/2, y: TAU/4},

});

var tail = new Zdog.Shape({
  addTo: tailAnchor,
  path: [
    { x: -3, y: 0 },
    { arc: [
      { x:  5, y: -2 },
      { x:  6, y:  3 },
    ]},
    { arc: [
      {x: 6, y: 6.5 },
      {x: 3, y: 6 },
    ]},
    { arc: [
      {x: -0.5, y: 5.5 },
      {x: 1, y: 2 },
    ]},
    { arc: [
      {x: 4, y: -1 },
      {x: 5, y: 3 },
    ]},
    { arc: [
      {x: 5, y: 5 },
      {x: 3, y: 4 },
    ]},
    { arc: [
      {x: 2, y: 2 },
      {x: 4, y: 1.5 },
    ]},
  ],
  closed: false,
  stroke: 0.5,
  color: dBlue,
  fill: false,

});

//blue shading in center of tail
var tailcenter = new Zdog.Shape({
  addTo: tailAnchor,
  path: [
      {x: 5, y: 3 },
    { arc: [
      {x: 5, y: 5 },
      {x: 3, y: 4 },
    ]},
    { arc: [
      {x: 2, y: 2 },
      {x: 4, y: 1.5 },
    ]},
  ],
  closed: true,
  stroke: 0.5,
  color: dBlue,
  fill: true,

});

tail.copy({
  color: mBlue,
  stroke: 6,
  scale: 0.6,
  translate: {x: 1, y:1,z:2},
});

tail.copy({
  translate: {z:4},
});

tailcenter.copy({
  translate: {z:4},
});

// ----- head ----- //
var head = new Zdog.Hemisphere({
  addTo: illo,
  diameter: 5,
  stroke: 7.5,
  color: mBlue,
  translate: {y: -6, z:2},
  rotate: {x: TAU/3},
});

var chinGroup = new Zdog.Group({
  addTo: head,
});

var chin = new Zdog.RoundedRect({
  addTo: chinGroup,
  width: 9,
  height: 7,
  stroke: 1,
  cornerRadius: 10,
  color: lBlue,
  fill: true,
  translate: {y: 1.5, z:-3},
  rotate: {x: TAU/64},
})

var chinlower = new Zdog.RoundedRect({
  addTo: head,
  width: 7,
  height: 6,
  stroke: 1,
  cornerRadius: 6,
  color: lBlue,
  fill: true,
  translate: {y: 2, z:-3.5},
  rotate: {x: TAU/64},
})

// ----- nose divot ----- //
var nose = new Zdog.Shape({
  addTo: chin,
  path: [
    {x: -3, y:2, z:-1},
    {arc: [
      {x: -3, y: 1.5, z: -.5},
      { x:  -2, y:  1 },
    ]},
    { arc: [
      { x:  0, y:  1 },
      { x:  0, y:  0 },
    ]},
    { arc: [
      { x:  0, y:  1 },
      { x:  2, y:  1 },
    ]},
    {arc: [
      {x:3, y:1.5, z:-.5},
      {x:3, y:2, z:-1},
    ]}
  ],
  translate: {y: 4.5, z:1},
  rotate: {x: -TAU/3},
  closed: true,
  stroke: .5,
  color: lBlue,
  fill: true,
});


// ----- cheek blush ----- //
var blush = new Zdog.Ellipse({
  addTo: chinGroup,
  width: 1,
  height: 2.5,

  translate: {x: 3, y: 5.5, z:-2.5},
  rotate: {x: 5*TAU/8, z:TAU/8, y: -TAU/12},
  color: dBlue,
  fill: true,
});

blush.copy({
  translate: {x: -3, y: 5.5, z:-2.5},
  rotate: {x: TAU/8, z:TAU/8, y: -TAU/12},
});


var mouth = new Zdog.Ellipse({
  addTo: nose,
  width: 2.5,
  height: 3.5,
  color: lRed,
  fill: true,
  stroke: 0.5,
  translate: {z:-.5, y:2.5},
  rotate: {x: -TAU/8},

});


var eye = new Zdog.Shape({
  addTo: head,
  path: [
    { z: 0 }, // start at 1st point
    { z:  -1 }, // line to 2nd point
  ],
  stroke: .5,
  color: black,
  translate: {x: -1.5,y: 5.5, z: -1},
});

eye.copy({
  translate: {x: 1.5,y: 5.5, z:-1},
});


// ----- head comb ----- //

var combAnchor = new Zdog.Shape({
  addTo:head,
    translate: {y:3.4, z:5.5},
    stroke: 0,
    rotate: {y:TAU/2, z:TAU/2, x:1-(TAU/20)},
});

var combfront = new Zdog.Shape({
  addTo: combAnchor,
  path: [
    { x: 0, y: 0 },
    { arc: [
      { x:  1, y: 4 },
      { x:  5, y:  4 },
    ]},
  ],
  closed: false,
  stroke: 1,
  color: dBlue,
  fill:false,

rotate: {x:TAU/2, y: TAU/4},
translate: {z:1},
});



var combLarge = new Zdog.Shape({
  addTo: combAnchor,
  path: [
    { x: 0, y: 0 },
    { arc: [
      { x:  1, y: 4 },
      { x:  5, y:  4 },
    ]},
    { arc: [
      { x:  10, y:  3 },
      { x:  6, y:  1 },
    ]},
    { arc: [
      { x:  4, y:  0 },
      { x:  1, y:  0 },
    ]},
  ],
  closed: true,
  stroke: .5,
  color: yellow,
  fill:true,
  rotate: {x:TAU/2, y: TAU/4},

});


var combSmall = new Zdog.Shape({
  addTo: combAnchor,
  path: [
    { x: 0, y: 0 },
    { arc: [
      { x:  2, y: 1 },
      { x:  4, y:  0 },
    ]},
    { arc: [
      { x:  8, y:  -1.5 },
      { x:  4, y:  -2 },
    ]},
    { arc: [
      { x:  2, y:  -2 },
      { x:  1, y:  -1 },
    ]},
  ],
  closed: true,
  stroke: .5,
  color: yellow,
  fill:true,

rotate: {x:TAU/2, y: TAU/4},

});


// ----- calling  ----- //

var soundGroup = new Zdog.Group({
  addTo: head,
  translate: {x:-10, y:10, z: 1},
  rotate: {x:TAU/4, y:TAU/8},

});

//longer line
var longLines = new Zdog.Shape({
  addTo: soundGroup,
 path: [
   { x: -1.5 }, // start at 1st point
   { x:  1 }, // line to 2nd point
 ],
 stroke: 0.5,
 color: dBlue,
});

//shorter line
var shortLines = new Zdog.Shape({
  addTo: longLines,
  path: [
    { x: 0 }, // start at 1st point
    { x:  1 }, // line to 2nd point
  ],
  stroke: 0.5,
  color: dBlue,
  translate: {y: 0.7},
});
//bottom
longLines.copyGraph({
  translate: {y: 3, x: 0.5},
  rotate: {z:-TAU/20},
});
//top
longLines.copyGraph({
  translate: {y: -4, x:0.5},
  rotate: {z:TAU/20},
});


function animate() {
illo.rotate.y += 0.01;
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}

animate();
