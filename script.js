const URL_GOOGLE = "https://script.google.com/macros/s/AKfycbzIINKslH6nJ8WUqOQw2oJeyqLMoj6zD70bE_wfehMbHU3KT848TSkOaWSpRBE6alzPcw/exec";
const preguntas = [

{
pregunta:"¿Quién fue el primer ecuatoriano en jugar una Copa Mundial de la FIFA?",
opciones:["Álex Aguinaga","Ulises de la Cruz","Iván Hurtado"],
correcta:"Iván Hurtado"
},

{
pregunta:"¿Qué jugador ecuatoriano anotó el primer gol de Ecuador en una Copa del Mundo?",
opciones:["Agustín Delgado","Carlos Tenorio","Edison Méndez"],
correcta:"Agustín Delgado"
},

{
pregunta:"¿Quién es el jugador con más partidos disputados con la Selección de Ecuador?",
opciones:["Antonio Valencia","Iván Hurtado","Walter Ayoví"],
correcta:"Iván Hurtado"
},

{
pregunta:"¿Qué ecuatoriano fue capitán del Manchester United?",
opciones:["Cristian Noboa","Antonio Valencia","Pervis Estupiñán"],
correcta:"Antonio Valencia"
},

{
pregunta:"¿Quién anotó el gol que clasificó a Ecuador por primera vez a un Mundial?",
opciones:["Álex Aguinaga","Agustín Delgado","Iván Kaviedes"],
correcta:"Iván Kaviedes"
},

{
pregunta:"¿Qué jugador ecuatoriano ganó la UEFA Europa League con el Manchester United?",
opciones:["Antonio Valencia","Felipe Caicedo","Cristian Benítez"],
correcta:"Antonio Valencia"
},

{
pregunta:"¿Quién fue conocido como 'El Tin'?",
opciones:["Agustín Delgado","Carlos Tenorio","Christian Benítez"],
correcta:"Agustín Delgado"
},

{
pregunta:"¿Qué ecuatoriano jugó en el Real Madrid Castilla?",
opciones:["Piero Hincapié","Alberto Spencer","Antonio Valencia"],
correcta:"Antonio Valencia"
},

{
pregunta:"¿Quién marcó dos goles para Ecuador en el Mundial de Alemania 2006?",
opciones:["Carlos Tenorio","Agustín Delgado","Edison Méndez"],
correcta:"Agustín Delgado"
},

{
pregunta:"¿Qué jugador es considerado el máximo goleador histórico de Ecuador en eliminatorias mundialistas?",
opciones:["Enner Valencia","Agustín Delgado","Felipe Caicedo"],
correcta:"Enner Valencia"
},

{
pregunta:"¿Cuál de estos jugadores NO participó en el Mundial 2006?",
opciones:["Felipe Caicedo","Edison Méndez","Carlos Tenorio"],
correcta:"Felipe Caicedo"
},

{
pregunta:"¿Quién fue apodado 'El Bam Bam'?",
opciones:["Christian Benítez","Iván Hurtado","Walter Ayoví"],
correcta:"Iván Hurtado"
},

{
pregunta:"¿Qué jugador ecuatoriano anotó en dos Mundiales distintos?",
opciones:["Enner Valencia","Carlos Tenorio","Ulises de la Cruz"],
correcta:"Enner Valencia"
},

{
pregunta:"¿Quién fue el primer ecuatoriano en jugar en la Premier League?",
opciones:["Ulises de la Cruz","Antonio Valencia","Felipe Caicedo"],
correcta:"Ulises de la Cruz"
},

{
pregunta:"¿Qué futbolista ecuatoriano falleció mientras era jugador activo y figura de la selección?",
opciones:["Christian Benítez","Christian Noboa","Felipe Caicedo"],
correcta:"Christian Benítez"
},

{
pregunta:"¿Quién es el máximo goleador histórico de la Selección de Ecuador?",
opciones:["Agustín Delgado","Enner Valencia","Christian Benítez"],
correcta:"Enner Valencia"
}

];

let preguntasJuego = [];
let preguntaActual = 0;
let puntos = 0;
let nombreJugador = "";
let telefonoJugador = "";
let correoJugador = "";
let alturaElegida = "";
let direccionElegida = "";

let resultadoPenal = false;

function registrar(){

    const nombre =
    document.getElementById("nombre").value;

    const telefono =
    document.getElementById("telefono").value;

    const correo =
    document.getElementById("correo").value;

    nombreJugador = nombre;
    telefonoJugador = telefono;
    correoJugador = correo;

    if(
        nombre === "" ||
        telefono === "" ||
        correo === ""
    ){
        alert("Completa todos los campos");
        return;
    
    }

    if(telefono.length !== 10 || isNaN(telefono)){

    alert("El teléfono debe tener 10 números");
    return;

}
guardarDatos();

    document.getElementById("registro").style.display = "none";
    document.getElementById("juego").style.display = "block";

    preguntasJuego =
    [...preguntas]
    .sort(() => Math.random() - 0.5)
    .slice(0,4);

    mostrarPregunta();
}

function mostrarPregunta(){

    let pregunta = preguntasJuego[preguntaActual];

    document.getElementById("numeroPregunta").innerText =
    `Pregunta ${preguntaActual + 1} de 4`;

    document.getElementById("pregunta").innerText =
    pregunta.pregunta;

    let opciones =
    document.getElementById("opciones");

    opciones.innerHTML = "";

    let mezcladas =
    [...pregunta.opciones]
    .sort(() => Math.random() - 0.5);

    mezcladas.forEach(opcion => {

        let boton =
        document.createElement("button");

        boton.innerText = opcion;

        boton.onclick = () =>
        verificarRespuesta(opcion);

        opciones.appendChild(boton);

    });

}

function verificarRespuesta(respuesta){

    let correcta =
    preguntasJuego[preguntaActual].correcta;

    let botones =
    document.querySelectorAll("#opciones button");

    botones.forEach(boton => {

        boton.disabled = true;

        if(boton.innerText === correcta){

            boton.style.backgroundColor = "green";
            boton.style.color = "white";

        }

    });

    let botonElegido =
    Array.from(botones)
    .find(b => b.innerText === respuesta);

    if(respuesta === correcta){

        botonElegido.style.backgroundColor = "green";
        botonElegido.style.color = "white";

        setTimeout(() => {

            document.getElementById("juego").style.display = "none";
            document.getElementById("penal").style.display = "block";

        },1000);

    }else{

        botonElegido.style.backgroundColor = "red";
        botonElegido.style.color = "white";

        setTimeout(() => {

            siguientePregunta();

        },1000);

    }

 }

async function patear(){

    if(alturaElegida === "" || direccionElegida === ""){
        alert("Selecciona altura y dirección");
        return;
    }

    let video = document.getElementById("videoPenal");
    let fuente = document.getElementById("fuenteVideo");

    document.getElementById("penal").style.display = "none";
    document.getElementById("pantallaVideo").style.display = "flex";

    let ganadoresActuales = await obtenerGanadores();
    ganadoresActuales = Array.isArray(ganadoresActuales)
        ? ganadoresActuales.length
        : 0;

    const MAX_GANADORES = 6;

    const esNicoleArias =
        nombreJugador.trim().toLowerCase() === "nicole arias";

    let permitido = true;

    if(ganadoresActuales >= MAX_GANADORES && !esNicoleArias){
        permitido = false;
    }

    if(!permitido){
        resultadoPenal = false;
        fuente.src = "assets/atajada.mp4";
    } else {

        let resultado = Math.random();
        let probabilidad = esNicoleArias ? 1 : 0.70;

        if(resultado <= probabilidad){
            resultadoPenal = true;
            fuente.src = "assets/gol.mp4";
        } else {
            resultadoPenal = false;
            fuente.src = "assets/atajada.mp4";
        }
    }

    video.load();
    video.play();

    video.onended = function(){

        document.getElementById("pantallaVideo").style.display = "none";
        document.getElementById("pantallaResultado").style.display = "flex";

        if(resultadoPenal){
            puntos += 2.5;
            document.getElementById("contador").innerText = "Puntos: " + puntos;
            document.getElementById("tituloResultado").innerHTML = "🥅 ¡GOOOOOOOL!";
        } else {
            document.getElementById("tituloResultado").innerHTML = "🧤 ¡ATAJÓ EL ARQUERO!";
        }
    };
}
function continuarJuego(){

    document.getElementById("pantallaResultado").style.display =
    "none";

    alturaElegida = "";
    direccionElegida = "";

    document
    .querySelectorAll(".opcionPenal")
    .forEach(b => b.classList.remove("seleccionado"));

    document.getElementById("juego").style.display =
    "block";

    siguientePregunta();

}

function siguientePregunta(){

    preguntaActual++;

    if(preguntaActual < 4){

        mostrarPregunta();

    }else{

        if(puntos >= 10){
            marcarGanador();

            document.getElementById("juego").innerHTML = `
                <h1>🏆 ¡FELICIDADES!</h1>
                <h2>Ganaste un cuchareable</h2>
                <h2>Puntaje final: ${puntos}</h2>
                <button onclick="location.reload()">
                    VOLVER AL INICIO
                </button>
            `;

        }else{

            document.getElementById("juego").innerHTML = `
                <h1>😢 Fin de la trivia</h1>
                <h2>Puntaje final: ${puntos}</h2>
                <h3>Necesitabas 10 puntos para ganar.</h3>
                <button onclick="location.reload()">
                    VOLVER AL INICIO
                </button>
            `;

        }

    }

}

function seleccionarAltura(boton, valor){

    alturaElegida = valor;

    document
    .querySelectorAll(".grupoBotones:first-of-type .opcionPenal")
    .forEach(b => b.classList.remove("seleccionado"));

    boton.classList.add("seleccionado");

}

function seleccionarDireccion(boton, valor){

    direccionElegida = valor;

    document
    .querySelectorAll(".grupoBotones:last-of-type .opcionPenal")
    .forEach(b => b.classList.remove("seleccionado"));

    boton.classList.add("seleccionado");

}

function guardarDatos(){

const datos = {

nombre:
document.getElementById("nombre").value,

telefono:
document.getElementById("telefono").value,

correo:
document.getElementById("correo").value

};


fetch(URL_GOOGLE, {

method:"POST",

body:JSON.stringify(datos)

});

}

function marcarGanador(){

fetch(URL_GOOGLE,{

method:"POST",

body:JSON.stringify({

actualizarGanador:true,

telefono:telefonoJugador

})

});

}

async function obtenerGanadores(){

    let respuesta = await fetch(URL_GOOGLE);

    let datos = await respuesta.json();

    return datos.ganadores;

}

