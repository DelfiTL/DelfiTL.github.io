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
//----FRECUENCIA -----
let audioContext; //motor de audio del navegador
let frecuencia; //variable donde cargo los valores de frecuencia del sonido de entrada
let frecuenciaAnterior; //memoria de la variable "frecuencia". Guarda el valor de la variable en fotograma anterior
const pichModel = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let muchafrec = false;

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
//let capa2;
//---CLASES
let fig;
let imagen;
//let capt;

//var estado = [];
let estado=1;

//let t = 300; //transparencia de la captura final


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
  // classifier = ml5.soundClassifier(classModel + 'model.json', options); //clsificador
  classifier = ml5.soundClassifier(soundModel + 'model.json');

  fondo = loadImage('/assets/fondo.jpg');
  papel = loadImage('/assets/papel.jpg');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  userStartAudio(); // esto lo utilizo porque en algunos navigadores se cuelga el audio. Esto hace un reset del motor de audio (audio context)

  fig = new Figuras();
 // capt = new Capturas();
 
  //FUNCIONES DE AUDIO
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  classifier.classify(gotResult);

}

function draw() {
  //windowResized();
  background(fondo);

  //AMPLITUD
  amp = mic.getLevel();
  haySonido = amp > AMP_MIN;
  nohaySonido = amp < AMP_MIN;
  let empezoElSonido = haySonido && !antesHabiaSonido; // EVENTO
  antesHabiaSonido = haySonido; //guardo el estado anterior
  //FRECUENCIAS
  muchafrec = frecuencia > FREC_MAX;
  let difDeFrecuencia = frecuencia - frecuenciaAnterior;
  frecuenciaAnterior = frecuencia;
  

  
    
  fig.dibujarcapa1();
  fig.dibfig();
  if (label == 'silbido') {
    label = ''; //pa invocarlo una sola vez (una funcion) pa k no se repita
    A = (A + 1) % 17; 
 //A2 = (A2 + 1) % 17; 
  B = (A + 1) % 12; 
  C = (A + 1) % 3; 
  D = (A + 1) % 8; 
  }

  if (haySonido) {
    fig.mover();
  }
  
}

// un aplauso, un sonido alto en poco tiempo
//agrregar mas imagenes con el sonido, dependiendo el sonido?

function mouseClicked(){
 A = (A + 1) % 17; 
 //A2 = (A2 + 1) % 17; 
  B = (A + 1) % 12; 
  C = (A + 1) % 3; 
  D = (A + 1) % 8; 
}


/*function windowResized() { //funcion para actualizar el tam de la pantalla
  resizeCanvas(windowWidth, windowHeight);
}*/


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
