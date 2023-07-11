//-------CONFIGURACION----
let AMP_MIN = 0.003; // umbral mínimo de amplitud. Señal que supera al ruido de fondo
let AMP_MAX = 0.1; // umbral máximo de amplitud. 
let FREC_MIN = 180;
let FREC_MAX = 800;
//-----ENTRADA DE AUDIO----
let mic;
//-----AMPLITUD----
let amp; 
let haySonido = false; 
let nohaySonido = false;
let antesHabiaSonido = false; 

let audioContext; //motor de audio del navegador
//----FRECUENCIA -----
//let frecuencia; //variable donde cargo los valores de frecuencia del sonido de entrada
//let frecuenciaAnterior; //memoria de la variable "frecuencia". Guarda el valor de la variable en fotograma anterior
//const pichModel = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

//------CLASIFICADOR-----
let classifier;
let label = 'listening...';
// Teachable Machine model URL:
let soundModel = 'https://teachablemachine.withgoogle.com/models/SyNOd-WVL/';

//----IMAGENES -----
let fondo, papel; //los background

//----PGRAPHICS---
let capa1;
let capa2;
//---CLASES
let fig;
let imagen;
let capt;



function preload() {
  for (var i = 1; i < 19; i++) {
    var imagen = loadImage("assets/figu/fig" + i + ".png");
    peq.push(imagen);
  }
  for (var i = 1; i < 14; i++) {
    var imagen = loadImage("assets/figu/figura" + i + ".png");
    med.push(imagen);
  }
  for (var i = 1; i < 5; i++) {
    var imagen = loadImage("assets/figu/cuad" + i + ".png");
    cuad.push(imagen);
  }
  for (var i = 1; i < 10; i++) {
    var imagen = loadImage("assets/figu/rec" + i + ".png");
    rec.push(imagen);
  }
  for (var i = 1; i < 3; i++) {
    var imagen = loadImage("assets/figu/grup" + i + ".png");
    grup.push(imagen);
  }
  fondo = loadImage('assets/fondo.png');
  papel = loadImage('assets/papel.jpg');
  
   classifier = ml5.soundClassifier(soundModel + 'model.json');
}

function setup() { 
  createCanvas(windowWidth, windowHeight);
  userStartAudio(); // esto lo utilizo porque en algunos navigadores se cuelga el audio. Esto hace un reset del motor de audio (audio context)
  
  //FUNCIONES DE AUDIO
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  
  classifier.classify(gotResult);
  //CLASES
   fig = new Figuras();
   capt = new Capturas();
}

function draw() {
 background(0);
 
 //AMPLITUD
 amp = mic.getLevel();
 haySonido = amp > AMP_MIN;
 nohaySonido = amp < AMP_MIN;
 antesHabiaSonido = haySonido; //guardo el estado anterior
 //let empezoElSonido = haySonido && !antesHabiaSonido; // EVENTO
  //FRECUENCIAS
 // muchafrec = frecuencia > FREC_MAX;
  //let difDeFrecuencia = frecuencia - frecuenciaAnterior;
 // frecuenciaAnterior = frecuencia;
  

 
 fig.dibujarcapa1();
 fig.dibfig();
 capt.captura();
 
 
 if (haySonido ) {
   fig.mover();
   fig.cambiarestado();
   if (label =='shh'){ fig.tamfig();  }
  }
}


function windowResized() { //funcion para actualizar el tam de la pantalla
  resizeCanvas(windowWidth, windowHeight);
}
//-------FRECUENCIA-----
function startPitch() {
  pitch = ml5.pitchDetection(pichModel, audioContext, mic.stream, modelLoaded);
}
function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      frecuencia = frequency;
    } else {
    }
    getPitch();
  })
}
//-------Clasificador-----
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
}

