// Seleziona il bottone
const bottone = document.getElementById('btn');

// Aggiungi un event listener al bottone
bottone.addEventListener('click', ScrollToMenu);

// Funzione che porta alla sezione menu
function ScrollToMenu() {
  // Seleziona la sezione menu
  const sezioneMenu = document.getElementById('menu');
  
  // Utilizza la funzione scrollIntoView per scorrere fino alla sezione menu
  sezioneMenu.scrollIntoView({ behavior: 'smooth' });
}



//Ripetere l'operazione per il secondo pulsante
const button = document.getElementById('scroll-to-btn');

button.addEventListener('click', VaiAlMenu);

function VaiAlMenu() {
  const sezioneMenu = document.getElementById('menu');
  sezioneMenu.scrollIntoView({ behavior: 'smooth' });
}



//ripetere per le ancore scorciatoie

const ancora1 = document.getElementById('ancora1');
ancora1.addEventListener('click', EsploraSezione1);

function EsploraSezione1() {
    const sezioneAntipasti = document.getElementById('antipasti-terrine');
    sezioneAntipasti.scrollIntoView({behavior: 'smooth' });
}



const ancora2 = document.getElementById('ancora2');
ancora2.addEventListener('click', EsploraSezione2);

function EsploraSezione2() {
    const sezioneBevande = document.getElementById('Bevande');
    sezioneBevande.scrollIntoView({behavior: 'smooth' });
}



const ancora3 = document.getElementById('ancora3');
ancora3.addEventListener('click', EsploraSezione3);

function EsploraSezione3() {
    const sezionePrimiSecondi = document.getElementById('PrimiSecondi');
    sezionePrimiSecondi.scrollIntoView({behavior: 'smooth' });
}



const ancora4 = document.getElementById('ancora4');
ancora4.addEventListener('click', EsploraSezione4);

function EsploraSezione4() {
    const sezionePizze = document.getElementById('Pizze');
    sezionePizze.scrollIntoView({behavior: 'smooth' });
}