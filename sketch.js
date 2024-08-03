

let img, imgelem;
var resolution = 5;
let gui;
let cols, rows;
var palette_length = 6;
var col1 = {color:'#000000'};
let col2 = {color:'#000000'};
let col3 = {color:'#000000'};

let col4 = {color:'#000000'};
let col5 = {color:'#000000'};
let col6 = {color:'#000000'};

var color1 ='#000000';
var color2 ='#7937db';
var color3 ='#3260a8';
var color4 ='#328fa8';
var color5 ='#37db8c';
var color6 ='#000000';


let palette = [col1, col2, col3, col4, col5, col6];
var mainColor = '#0591f5';
var shape = ["Circle","Rectangle"];


function preload() {
  img = loadImage('eclipse.jpg');
}

function setup() {


  cnv = createCanvas(1000, 1000);
  let newCanvasX = (windowWidth- img.width)/2;
  let newCanvasY = (windowHeight- img.height)/2;
  cnv.position(newCanvasX,newCanvasY)

  img.resize(0,height);
  noStroke();
  input = createFileInput(handleFile);
  gui = createGui('');
  gui.setPosition(0,30);
  sliderRange(2, 20, 1);

  gui.addGlobals('resolution');
  sliderRange(2, 20, 2);
  for(let i=1; i<=palette_length;i++){
    gui.addGlobals('color'+i);
  }
  
  sliderRange(1, palette.length, 1);
  gui.addGlobals('palette_length');
  gui.addGlobals('shape');


  noLoop();
  ellipseMode(CORNER);
  
  
  
  
}


function draw() {
  background(250) ;
  
  img.loadPixels();
  col1.color=color1;
  col2.color=color2;
  col3.color=color3;
  col4.color=color4;
  col5.color=color5;
  col6.color=color6;
  //setPalette();
  cols = width / resolution;
  rows = height / resolution;
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      push();
      let current_pixel = 4*((i * resolution) + (j * resolution) * img.width);
      let c = color(img.pixels[current_pixel],
                    img.pixels[current_pixel + 1],
                    img.pixels[current_pixel + 2],
                    )
      let b = round(map(brightness(c),0,100,0,palette_length-1));
      translate(i*resolution, j*resolution);
      fill(palette[b].color); 
      if(shape=="Circle")
        ellipse(0,0,resolution,resolution);
      else rect(0,0,resolution,resolution);
      pop();

    }
  }
  
}
function handleFile(file){
  imgLoaded = false;
  if (file.type === 'image') {
    // Create the image as an img element. 
    // The 'imgCreated' function will be called when it
    // is done, so we can convert it into a p5.Image object
    imgelem = createImg(
      file.data, 'Alt text', 'anonymous', imgCreated);
    imgelem.hide();
  } else {
    imgelem = null;
  }
}

// Once the img element is created, use it to 
// convert the image element into a p5Image object. 
function imgCreated(){
  imgelem.hide();
  // Create a temporary p5.Graphics object to draw the image.
  let g = createGraphics(imgelem.elt.width, imgelem.elt.height);
  g.image(imgelem, 0, 0);
  // Remove the original element from the DOM.
  imgelem.remove();
  // g.get will return image data as a p5.Image object
  img = g.get(0, 0, g.width, g.height);
  img.resize(width,height);
  loop();
  
  // Because we've converted it into a p5.Image object, we can
  // use functions such as 'resize', and 'filter',
  // which aren't available on the HTML img element.
  // Uncomment the following lines for an example...
  
  /*
  // Resize it to fill the canvas
  if (img.width < img.height){
    img.resize(width, 0);
  } else {
    img.resize(0, height);
  }
  
  // Posterize and invert the colours
  img.filter(POSTERIZE, 2);
  img.filter(INVERT);
  */

  // Record that we have finished creating the image object.
}

function setPalette(){
  colorMode(HSB);
  let temp_color = color(mainColor);
  for(let i =0; i < palette_length; i++){
    let b = i * 100.  / palette_length;
    temp_color = color(hue(b),saturation(temp_color),b);   
    print(b);
    palette[i] = temp_color;
  }
}
function keyPressed() {
  if (key === 's') {
    saveCanvas();
  } 
  
}