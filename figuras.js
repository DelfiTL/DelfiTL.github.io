//---MOVIMIENTO -----
let vel = 0.3;
let vel3 = 1.5;
let mov1 = 0;
let mov2 = 0;
let mov3 = 0;
let mov4 = 0;
//----ESTADOS imagenes -----
let A = 0; //para peq
let B = 0; //para med
let C = 0; //para cuad
let D = 0; //para rec
let E = 0; //grupito
var peq = [];
var med = [];
var cuad = [];
var rec = [];
var grup = [];

class Figuras {

  constructor() {
    //let voz = 100; //valor inicial
    let mivoz = map(amp, nohaySonido, AMP_MIN, haySonido, AMP_MAX);
    capa1 = createGraphics(windowWidth - 150, windowHeight - 30); //antes -150 height
    //  A=random(0,17);
  }

  dibujarcapa1() {
    push();
    imageMode(CENTER);
    image(capa1, windowWidth / 2, windowHeight / 2);
    capa1.background(papel);
    pop();
  }
  mover() {
    mov1 = mov1 + vel;
    mov2 = mov2 + vel;
    mov3 = mov3 + vel3;
    mov4 = mov4 + vel3;
    //MOVIMIENTO NIVEL 1
    if (mov1 >= 20) { vel--; }
    if (mov1 <= 0) { vel++; }
    //MOVIMIENTO NIVEL 2
    if (mov2 >= 50) { vel--; }
    if (mov2 <= 0) { vel++; }
    //MOVIMIENTO NIVEL 3
    if (mov3 >= 150) { vel3--; }
    if (mov3 <= 0) { vel3++; }
    //MOVIMIENTO NIVEL 4
    if (mov4 >= 500) { vel3--; }
    if (mov4 <= 0) { vel3++; }
  }

  cambiarestado() {
    if (label == 'silbido') {
      label = ''; //pa invocarlo una sola vez (una funcion) pa k no se repita

      A = A + 1; if (A == 17) { A = 0; }
      B = B + 1; if (B == 12) { B = 0; }
      C = C + 1; if (C == 3) { C = 0; }
      D = D + 1; if (D == 7) { D = 0; }
      E = E + 1; if (E == 2) { E = 0; }
      //A = (A + 1) % 17; 
      // B = (B + 1) % 12; 
      //  C = (C + 1) % 3; 
      // D = (D + 1) % 7; 
    }
  }


  dibfig() {
    //----------PALETA DE IMAGENES---------
    //capa1.image(peq[A], 100,100,100,100);
    //capa1.image(med[B], 200,200,100,100);
    //capa1.image(cuad[C], 500,200,100,100);
    //capa1.image(rec[D], 500,100,100,100);
    //capa1.image( grup[E], 500,300,100,100);

    // let mivoz = map(amp, nohaySonido, AMP_MIN, haySonido, AMP_MAX);
    //  let a = mivoz/100;
    let ang = atan2(265 - 290, 650 - 633); //atan2 devuelve angulos de PI/2
    let ang2 = atan2(30 - 290, 700 - 633);
    let ang2b = atan2(285 - 290, 665 - 633);
    let ang3 = atan2(295 - 290, 800 - 633);
    let ang4 = atan2(250 - 290, 660 - 633); //atan2 devuelve angulos de PI/2
    capa1.angleMode(RADIANS);

    
    //-----GRUPO 3 DERECHA--------
    capa1.push();
    capa1.translate(490, 290); //antes 200 h
    capa1.rotate(ang3);
    capa1.image(rec[D+1], -150 + mov4, 0, 640, 77);
    capa1.image(peq[11], 90, 130 + mov2, 30, 23); //amarillo
    capa1.image(peq[A], -140, 100 + mov3, 35, 35);
    capa1.image(peq[A ], 100 - mov3, 85, 45, 15);
    capa1.push();
    capa1.imageMode(CENTER);
    capa1.image(med[B], 490, 100, 200 + mov2, 17); //tam ++
    capa1.pop();
    capa1.push();
    capa1.translate(500 + mov2, 144);
    capa1.rotate(6);
    capa1.imageMode(CENTER);
    capa1.image(med[B], 0 - mov1, 0, 100, 15);
    capa1.image(med[B], 20 + mov1, 24, 50, 15);
    capa1.pop();
    capa1.pop();

    //-----GRUPO 4 DERECHA--------
    //SUB-GRUPO esquina derecha
    capa1.push();
    capa1.translate(700, -20);
    capa1.rotate(ang4);
    capa1.image(peq[A], 50, 210 - mov1, 5, 100);
    capa1.image(peq[7], 50, 370 + mov1, 10, 37);//roja
    capa1.image(med[5], 70, 320 + mov2, 4, 120);//celeste
    capa1.image(med[1], 70 - mov1, 120, 4, 120);//naranja
    capa1.image(med[9], 80, 150 - mov3, 4, 120);//negro
    capa1.image(med[11], 20, 215 - mov1, 5, 100);
    capa1.image(med[9], 30, 305 + mov1, 8, 90);
    capa1.image(med[9], 90+ mov1, 260, 5, 100);
    capa1.image(peq[0], 0, 325 + mov2, 10, 90);
    capa1.image(med[9], 10, 220 - mov4, 4, 120);//negro
    capa1.image(cuad[C ], 20 - mov1, 270, 60, 60); //cuadrado
    capa1.pop();



    //-----GRUPO 1 IZQUIERDA (principal)--------
    capa1.push();
    capa1.translate(0, height);
    capa1.rotate(ang);

    capa1.translate(300, 150); //acordate que es doble translate, aprox esta invertido =(Y,X)
    capa1.image(rec[D], 10, 50 + mov2, 500, 20); //rectangulo p
    capa1.image(cuad[C], 140, 40 - mov2, 180, 180); //cuadrado prin

    capa1.image(peq[A+1], 0 , 0-mov3, 50, 15);//arriba
    capa1.image(peq[15], -110-mov4 , 5, 100, 15);//arriba amarilla
    capa1.image(med[B], -90+mov3 , -75, 120, 30);//arriba
    capa1.image(cuad[C], -70-mov3 , -20, 20+mov1/2, 20+mov1/2);//cuad arriba

    capa1.image(peq[5], 0 + mov1, 100, 50, 15);
    capa1.image(med[B], 80, 80 + mov3, 30, 15);
    capa1.image(peq[A], 320 + mov3, 80, 100, 15);
    capa1.image(peq[A], 335 + mov1, 140 + mov2, 30, 15);
    capa1.image(peq[14], 500 + mov2, 150, 30, 15); //naranja
    capa1.image(peq[0], 450 + mov1, 100, 30, 15); //negra
    capa1.image(peq[0], 470, 100 + mov4, 40, 15); //negra
    capa1.image(peq[A], 340, 100 + mov2, 30, 20);
    capa1.image(med[B], 390 + mov1, 105, 30, 50);
    capa1.image(grup[E], 300 - mov2, -70 - mov1, 120, 50);
    
    capa1.pop();



    //-----GRUPO 2 IZQUIERDA--------
    capa1.push()
    capa1.translate(-10, 360);
    capa1.rotate(ang2);
    capa1.push();
    capa1.translate(260, 30);
    capa1.rotate(ang2b);
    capa1.image(peq[0], -150, 20 - mov2, 100, 13);
    capa1.image(med[4], -170 - mov2, 45, 100, 9); //amarillo
    capa1.rotate(ang2b);
    capa1.image(peq[A], 0, 0 + mov1, 75, 13);
    capa1.image(peq[2], 20 - mov2, -10, 80, 13);
    capa1.pop();
    capa1.image(rec[8], 100 + mov2, 170, 260, 50); //verde
    capa1.image(peq[6], 300 - mov3, 85, 90, 19); //grup
    capa1.image(peq[2], 282 + mov2, 46, 20, 30); //peque n
    capa1.pop();

  }

}