//***********************************************************************************************//
//****************************************INICIALIZACION*****************************************//
//***********************************************************************************************//

//CREAR AUDIO CONTEXT
window.AudioContext = window.AudioContext || window.webkitAudioContext;

//CREAR OBJETO PARA USAR AUDIO CONTEXT
var dsp = new AudioContext();

//CREAR OBJETO DE KEYBOARD
var keyboard = new QwertyHancock({
  id: 'keyboard',
  width: 800,
  height: 200,
  octaves: 3
});

//CREAR VARIABLES PARA DSP
var osc1Gain = dsp.createGain();
var osc2Gain = dsp.createGain();
var startOsc = false;
var actual = 0;
var osciladoresLista = {};
var notasLista = [];
var notasCont = 0;
var slideActual = 0;
var banderaModal = 0;
var notaConver = "Do";

//VARIABLES PARA INICIALIZAR DSP
var STATE = {
  osc1Volume: 0.5,
  osc1Type: "triangle",
  osc2Volume: 0.5,
  osc2Type: "triangle",
};

//CARROUSEL EVENTS
document.addEventListener('DOMContentLoaded', () => {
  const elementosCarousel = document.querySelectorAll('.carousel');
  M.Carousel.init(elementosCarousel, {
    duration: 150,
    dist: -80,
    shift: 5,
    padding: 5,
    numVisible: 3,
    indicators: true,
    noWrap: true,
    onCycleTo: function (actual) {
      document.getElementById("perro").style.display = "none";
      document.getElementById("pato").style.display = "none";
      document.getElementById("lecc2").style.display = "none";
      document.getElementById("lecc3").style.display = "none";
      document.getElementById("lecc4").style.display = "none";

      slideActual = $(actual).index();

      if($(actual).index() == 1){
        document.getElementById("perro").style.display = "flex";
      }

      if($(actual).index() == 9){
        document.getElementById("pato").style.display = "flex";
      }

      if($(actual).index() == 19){
        document.getElementById("lecc2").style.display = "flex";
      }

      if($(actual).index() == 27){
        document.getElementById("lecc3").style.display = "flex";
      }

      if($(actual).index() == 33){
        document.getElementById("lecc4").style.display = "flex";
      }
    }
    
  });
});

//INICIALIZANDO DSP
osc1Gain.gain.value = STATE.osc1Volume;
osc2Gain.gain.value = STATE.osc2Volume;

//***********************************************************************************************//
//****************************************ACTUALIZAR*********************************************//
//***********************************************************************************************//

//FUNCION PARA ACTUALIZAR GAIN DE OSC1
function changeOsc1Volume(osc1Gain) {
  STATE.osc1Volume = osc1Gain;
}

//FUNCION PARA ACTUALIZAR TIPO DE ONDA OSC1
function changeOsc1Type(osc1Type) {
  STATE.osc1Type = osc1Type;
}

//FUNCION PARA ACTUALIZAR GAIN DE OSC2
function changeOsc2Volume(osc2Gain) {
  STATE.osc2Volume = osc2Gain;
}

//FUNCION PARA ACTUALIZAR TIPO DE ONDA OSC2
function changeOsc2Type(osc2Type) {
  STATE.osc2Type = osc2Type;
}

//***********************************************************************************************//
//****************************************LISTENERS**********************************************//
//***********************************************************************************************//

//*****************************************OSC 1*************************************************//
//GAIN OSC1 LISTENER
var osc1VolumeLis = document.getElementById("Osc1Gain");
osc1VolumeLis.addEventListener("input", function () {
  osc1Gain.gain.value = this.value;
  changeOsc1Volume(this.value);
});

//TYPE OSC1 LISTENER
var osc1TypeLis = document.getElementById("Osc1Type");
osc1TypeLis.addEventListener("input", function () {
  STATE.osc1Type = this.value;
  STATE.osc3Type = this.value;
});

//***************************************OSC 2***************************************************//
//GAIN OSC2 LISTENER
var osc2VolumeLis = document.getElementById("Osc2Gain");
osc2VolumeLis.addEventListener("input", function () {
  osc2Gain.gain.value = this.value;
  changeOsc2Volume(this.value);
});

//TYPE OSC2 LISTENER
var osc2TypeLis = document.getElementById("Osc2Type");
osc2TypeLis.addEventListener("input", function () {
  STATE.osc2Type = this.value;
  STATE.osc4Type = this.value;
});

//***********************************************************************************************//
//************************************PROCESS BLOCK**********************************************//
//***********************************************************************************************//
var i = 0;

function createOscillatorObject(type, frequency, note) {
  var oscilador_id = "oscilador" + i;

  if (osciladoresLista.hasOwnProperty(oscilador_id)) {
    i++;
    createOsciladorSolo(i, type, frequency, note);
  } else {
    createOsciladorSolo(i, type, frequency, note);
  }
}

function createOscillatorObject2(type, frequency, note) {
  var oscilador_id = "oscilador_2" + i;

  if (osciladoresLista.hasOwnProperty(oscilador_id)) {
    i++;
    createOsciladorSolo2(i, type, frequency, note);
  } else {
    createOsciladorSolo2(i, type, frequency, note);
  }
}

function createOsciladorSolo(i, type, frequency, note) {
  var oscilador_id = "oscilador" + i;
  osciladoresLista[oscilador_id] = dsp.createOscillator();
  osciladoresLista[oscilador_id].type = type;
  osciladoresLista[oscilador_id].frequency.value = frequency;
  osciladoresLista[oscilador_id].start(0);
  osciladoresLista[oscilador_id].connect(osc1Gain);
  notasLista[notasCont] = note;
  notasCont++;
}

function createOsciladorSolo2(i, type, frequency, note) {
  var oscilador_id = "oscilador_2" + i;
  osciladoresLista[oscilador_id] = dsp.createOscillator();
  osciladoresLista[oscilador_id].type = type;
  osciladoresLista[oscilador_id].frequency.value = frequency;
  osciladoresLista[oscilador_id].start(dsp.currentTime);
  osciladoresLista[oscilador_id].connect(osc2Gain);
}

function stopOscillators() {
  for (var oscillator_id in osciladoresLista) {
    if (osciladoresLista.hasOwnProperty(oscillator_id)) {
      osciladoresLista[oscillator_id].stop(dsp.currentTime);
    }
  }
}

function notaEspanol(note) {
  document.getElementById("do").style.display = "none";
  document.getElementById("re").style.display = "none";
  document.getElementById("mi").style.display = "none";
  document.getElementById("fa").style.display = "none";
  document.getElementById("sol").style.display = "none";
  document.getElementById("la").style.display = "none";
  document.getElementById("si").style.display = "none";

  switch (note.charAt(0)) {
    case 'C':
      notaConver = "Do";
      document.getElementById("do").style.display = "block";
      
      if(slideActual == 2){
        $(document).ready(function(){
          $('.carousel').carousel('next');
        });
      }

      break;
    case 'D':
      notaConver = "Re";
      document.getElementById("re").style.display = "block";

      if(slideActual == 3){
        $(document).ready(function(){
          $('.carousel').carousel('next');
        });
      }
      break;
    case 'E':
      notaConver = "Mi";
      document.getElementById("mi").style.display = "block";
      if(slideActual == 4){
        $(document).ready(function(){
          $('.carousel').carousel('next');
        });
      }
      break;
    case 'F':
      notaConver = "Fa";
      document.getElementById("fa").style.display = "block";

      if(slideActual == 5){
        $(document).ready(function(){
          $('.carousel').carousel('next');
        });
      }
      break;
    case 'G':
      notaConver = "Sol";
      document.getElementById("sol").style.display = "block";

      if(slideActual == 6){
        $(document).ready(function(){
          $('.carousel').carousel('next');
        });
      }
      break;
    case 'A':
      notaConver = "La";
      document.getElementById("la").style.display = "block";

      if(slideActual == 7){
        $(document).ready(function(){
          $('.carousel').carousel('next');
        });
      }
      break;
    case 'B':
      notaConver = "Si";
      document.getElementById("si").style.display = "block";

      if(slideActual == 8){
        $(document).ready(function(){
          $('.carousel').carousel('next');
        });
      }
      break;
  }

  if (note.charAt(1) == '#')
    notaConver = notaConver + "#";

  return notaConver
}

keyboard.keyDown = function (note, frequency) {
  createOscillatorObject(STATE.osc1Type, frequency, note);
  createOscillatorObject2(STATE.osc2Type, frequency, note);

  document.getElementById("animales").style.display = "flex";
  document.getElementById("chord").innerHTML = notaEspanol(note);
  notasLista.sort();
  if (notasLista.length == 3) {
    Acorde2 = notasLista[0].charAt(0) + notasLista[1].charAt(0) + notasLista[2].charAt(0)
    switch(Acorde2)
    {
      //MAYORES
      case "CEG":
        document.getElementById("chord").innerHTML = "Acorde Mayor de DO";
        break;
      case "ADF":
        if(notasLista[2].charAt(1) == '#')
          document.getElementById("chord").innerHTML = "Acorde Mayor de RE";  
        else
          document.getElementById("chord").innerHTML = "Acorde Menor de RE";  
          break;
      case "BEG":
        if(notasLista[2].charAt(1) == '#')
          document.getElementById("chord").innerHTML = "Acorde Mayor de MI";  
        else
          document.getElementById("chord").innerHTML = "Acorde Menor de MI";  
        break;
      case "ACF":
        document.getElementById("chord").innerHTML = "Acorde Mayor de FA";  
        break;
      case "BDG":
        document.getElementById("chord").innerHTML = "Acorde Mayor de SOL";  
        break;
      case "ACE":
        if(notasLista[1].charAt(1) == '#')
          document.getElementById("chord").innerHTML = "Acorde Mayor de LA";
        else
          document.getElementById("chord").innerHTML = "Acorde Menor de LA";
        break;
      case "BDF":
        if((notasLista[1].charAt(1) == '#') && (notasLista[2].charAt(1) == '#'))
          document.getElementById("chord").innerHTML = "Acorde Mayor de SI";
        else
        {
          if(notasLista[2].charAt(1) == '#')
          document.getElementById("chord").innerHTML = "Acorde Menor de SI"; 
        }
        break;

      //MENORES
      case "CDG":
        if(notasLista[1].charAt(1) == '#')
          document.getElementById("chord").innerHTML = "Acorde Menor de DO";
          break;
      case "CFG":
        if(notasLista[2].charAt(1) == '#')
          document.getElementById("chord").innerHTML = "Acorde Menor de FA";
          break;
      case "ADG":
        if(notasLista[0].charAt(1) == '#')
          document.getElementById("chord").innerHTML = "Acorde Menor de SOL";
          break;
    }
  }

  for(sx = 0; sx < i; sx++)
  {
    var oscilador_id = "oscilador" + sx;
  }

  osc1Gain.connect(dsp.destination);
  osc2Gain.connect(dsp.destination);
}

keyboard.keyUp = function (note, frequency) {
  stopOscillators();

  // Primero limpiamos la nota
  for(var sx=0; sx < notasLista.length; sx++) {
    if (notasLista[sx] == note) {
      notasLista[sx] = "";
    }
  }

  // Luego recorremos
  for(var sx=0; sx < notasLista.length; sx++) {
    if (sx > 0 && notasLista[sx - 1] == "") {
      notasLista[sx - 1] = notasLista[sx];
      notasLista[sx] = "";
    }
  }

  // Lo eliminamos fisicamente
  notasLista.pop();
  notasCont--;

  document.getElementById("do").style.display = "none";
  document.getElementById("re").style.display = "none";
  document.getElementById("mi").style.display = "none";
  document.getElementById("fa").style.display = "none";
  document.getElementById("sol").style.display = "none";
  document.getElementById("la").style.display = "none";
  document.getElementById("si").style.display = "none";
}