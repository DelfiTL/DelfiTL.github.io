//---MOVIMIENTO -----
let vel = 0.5;
let vel3 = 1;
let mov1=0;
let mov2=0;
let mov3=0;
let mov4=0;
//----ESTADOS imagenes -----
let A = 0; //para peq
let B = 0; //para med
let C = 0; //para cuad
let D = 0; //para rec
var peq = [];
var med = [];
var cuad = [];
var rec = [];

class Figuras {

  constructor() {
    //let voz = 100; //valor inicial
    let mivoz = map(amp, nohaySonido, AMP_MIN, haySonido, AMP_MAX);
     capa1 = createGraphics(windowWidth - 290, windowHeight - 150);
  
  }


  dibujarcapa1() {
    push();
    imageMode(CENTER);
    image(capa1, windowWidth / 2, windowHeight / 2);
    capa1.background(papel);
    pop();
  }
mover(){
  mov1 =mov1+vel;
  mov2 =mov2+vel;
  mov3 =mov3+vel3;
  mov4 =mov4+vel3;
         if (mov1>=20 ) {
      vel--;
         }
         if (mov1<=0){
          vel++;
         }
         //MOVIMIENTO NIVEL 2
         if (mov2>=50 ) {
      vel--;
         }
         if (mov2<=0){
          vel++;
         }
         //MOVIMIENTO NIVEL 3
         if (mov3>=100 ) {
      vel3--;
         }
         if (mov3<=0){
          vel3++;
         }
         //MOVIMIENTO NIVEL 4
         if (mov4>=400 ) {
      vel3--;
         }
         if (mov4<=0){
          vel3++;
         }
        }
        

  dibfig() {
    //capa1.image(peq[A], 100,100,100,100);
    //capa1.image(med[B], 200,200,100,100);
    //capa1.image(cuad[C], 500,200,100,100);
    //capa1.image(rec[D], 500,100,100,100);
    
    let ang =atan2( 270-height / 2, 655- width / 2); //atan2 devuelve angulos de PI/2
    let ang2 = atan2(295 - height / 2, 800- width / 2);

    //-----GRUPO 3 DERECHA--------
   capa1.push();
      capa1.translate(400,200);
      capa1.rotate(ang2);
      capa1.image(rec[D], 0-mov4,0,550,65);
      capa1.image (peq[A],20,100+mov3,35,35);
      capa1.image (peq[A+1],100-mov3,85,45,15);
      capa1.push ();
        capa1.imageMode (CENTER);
        capa1.image(med[B], 380,100,200+mov3,17);
      capa1.pop();
      capa1.push ();
        capa1.translate (390+mov2,144);
        capa1.rotate(6);
        capa1.imageMode(CENTER);
        capa1.image(med[B], 0-mov1,0,100,15);
        capa1.image(med[B], 20+mov1,24,50,15);
     capa1.pop();
    capa1.pop();
 
    //-----GRUPO 1 IZQUIERDA--------
    capa1.push();
     capa1.translate(0, height);
     capa1.rotate(ang);
     capa1.push();
     capa1.translate(300+mov1,0);
      capa1.image(rec[D+1], 10,50+mov2,400,20);
      capa1.image(cuad[C], 150,40-mov1,140,140);
      capa1.image(peq[A], 0+mov1,100,50,15);
      capa1.image(med[9], 80,80+mov3,30,15);
      capa1.image(peq[17], 320+mov3,80,100,15);
      capa1.image(peq[A], 300,100+mov3,30,15);
      capa1.image(peq[A+1], 340,110+mov2,30,20);
      capa1.image(med[B], 390+mov1,105,40,60);
      capa1.pop();
   capa1.pop();



     //-----GRUPO 2 IZQUIERDA--------
     capa1.push();
     capa1.translate (-80,250);
     capa1.rotate (ang);
     capa1.push();
     capa1.translate (260,30);
     capa1.rotate(PI/35);
     capa1.image(peq[0], -150,20-mov2,100,13);
     capa1.image(med[4], -170-mov2,45,90,7);
     capa1.image(peq[A], 0,0+mov1,75,13);
     capa1.image(peq[2], 20-mov2,-10,80,13);
     capa1.pop();
     capa1.image(med[11], 100+mov3,100,200,30);
     capa1.image(peq[6], 300+mov2,75,90,15);
     capa1.pop();

   

  }

}