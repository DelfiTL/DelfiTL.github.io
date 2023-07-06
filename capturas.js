let captura;
let t = 300; //transparencia de la captura final
class Capturas {
   
    constructor(){
        capa2 = createGraphics (windowWidth, windowHeight);
       
    }
   pausa(){
    if (estado) {
        noLoop(); // Pausar la secuencia
        estado = false;
    } else{
          loop(); // Reanudar la secuencia
          estado = true;
      }
   }

   destello(){
       capa2.push();
       t = t - 50;//velocidad de la transparencia
       capa2.rectMode(CORNER);
       capa2.fill(255, 255, 255, t);
       capa2.rect(0, 0, width,height);
       capa2.pop();
    }
    dibujarcapa2(){
        push();
        imageMode(CENTER);
        image(capa1, windowWidth / 2, windowHeight / 2);
        pop();
       // capa2.capture();
      // capa2.pausa();
       capa2.destello();
      
    }

}




       /*  capture() {
             captura = get();
             html2canvas(document.querySelector('#defaultCanvas0')).then(function(canvas) {
               // Convertir el lienzo capturado en una imagen base64
               let screenshotDataUrl = canvas.toDataURL();
           
               // Utilizar la captura de pantalla en tu código
               let screenshotImage = createImg(screenshotDataUrl);
               screenshotImage.position(-width/2, -height/2, width,height);
             });
           }
           */
           // Llamar a la función captureScreenshot() al presionar una tecla
           
       /*  capturar(){
             captura = get(); //me devuelve el canvas(captura) del momento q lo invoco
            if (label == 'aplauso') {
             label = '';
                 html2canvas(document.querySelector('canvas')).then(function(canvas) {
                      captura = canvas.toDataURL('/assets/image/png');
                      console.log('Captura generada:', captura);
                     
                 });
             }
         }*/