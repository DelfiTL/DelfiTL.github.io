//-------CONFIGURACION----
//let AMP_MIN = 0.001; // umbral mínimo de amplitud. Señal que supera al ruido de fondo
let AMP_MIN = 0.003; // umbral mínimo de amplitud. Señal que supera al ruido de fondo
let AMP_MAX = 0.1; // umbral máximo de amplitud. 
let FREC_MIN = 180;
let FREC_MAX = 800;
//-----ENTRADA DE AUDIO----
let mic;
//-----AMPLITUD----
let amp; //variable donde cargo los valores de amplitud del sonido de entrada
let haySonido = false; // vaiable buleana que de define el ESTADO
let nohaySonido = false;
let antesHabiaSonido = false; //memoria de la variable "haySonido". Guarda el valor de la variable en fotograma anterior

//let audioContext; //motor de audio del navegador
//----FRECUENCIA -----
//let frecuencia; //variable donde cargo los valores de frecuencia del sonido de entrada
//let frecuenciaAnterior; //memoria de la variable "frecuencia". Guarda el valor de la variable en fotograma anterior
//const pichModel = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
//let muchafrec = false;

//------CLASIFICADOR-----
// Global variable to store the classifier
let classifier;
// Label
let label = 'listening...';
// Teachable Machine model URL:
//let soundModel = 'https://teachablemachine.withgoogle.com/models/CrltcAgn4/';
let soundModel = 'https://teachablemachine.withgoogle.com/models/Wyl8m9pz4/';
//let soundModel = './assets/my-audio-model'
//----IMAGENES -----
let fondo, papel; //los background
//let cantimg = 17;

//----PGRAPHICS---
let capa1;
let capa2;
//---CLASES
let fig;
let imagen;
let capt;


let estado=true;




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
  // classifier = ml5.soundClassifier(classModel + 'model.json', options); //clsificador
  classifier = ml5.soundClassifier(soundModel + 'model.json');

  fondo = loadImage('assets/fondo.jpg');
  papel = loadImage('assets/papel.jpg');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  userStartAudio(); // esto lo utilizo porque en algunos navigadores se cuelga el audio. Esto hace un reset del motor de audio (audio context)

  fig = new Figuras();
  capt = new Capturas();
 
  //FUNCIONES DE AUDIO
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  classifier.classify(gotResult);

 

}

function draw() {
  
 // background(fondo);
  background(0);

  //AMPLITUD
  amp = mic.getLevel();
  haySonido = amp > AMP_MIN;
  nohaySonido = amp < AMP_MIN;
  let empezoElSonido = haySonido && !antesHabiaSonido; // EVENTO
  antesHabiaSonido = haySonido; //guardo el estado anterior
  //FRECUENCIAS
 // muchafrec = frecuencia > FREC_MAX;
  //let difDeFrecuencia = frecuencia - frecuenciaAnterior;
 // frecuenciaAnterior = frecuencia;
  

  
  fig.dibujarcapa1();
  fig.dibfig();
  
  if (estado){
    if (haySonido) {
      fig.mover();
      fig.cambiarestado();
    }
}
if (label =='aplauso'){
  label = '';
 // capt.dibujarcapa2();
 // capt.pausa();

}

  
}
function mouseClicked(){
  A = A + 1; if (A == 17) { A = 0; }
  B = B + 1; if (B == 12) { B = 0; }
  C = C + 1; if (C == 3) { C = 0; }
  D = D + 1; if (D == 8) { D = 0; }
  E = E + 1; if (E == 2) { E = 0; }
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

