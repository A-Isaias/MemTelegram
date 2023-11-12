const cards = document.querySelectorAll(".card");
const num_parejas = document.querySelector(".container h2 span");
const tiempoRestanteElemento = document.getElementById("tiempo-restante");

const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");

const mostrarModal = (mensaje) => {
    modalMessage.innerHTML = mensaje.replace(/\n/g, '<br>'); // Reemplazar saltos de línea por <br>
    modal.style.display = "block";
};

const ocultarModal = () => {
    modal.style.display = "none";
};

let tar_1, tar_2, deshabilitarCartas = false;
let parejas = 0;
let intentos = 0;
let puntuacion = 0;
let consecutivas = 0;
const puntuacionMaxima = 1000; // Puntuación máxima que se puede alcanzar

let tiempoRestante = 60; // Inicializar el tiempo en segundos
let temporizador;

function actualizarReloj() {
    tiempoRestanteElemento.textContent = `Tiempo restante: ${tiempoRestante} segundos`;

    if (tiempoRestante === 0) {
        detenerJuego();
        mostrarGameOver("GAME OVER o sea perdiste culeado");
    } else {
        tiempoRestante--; // Decrementa el tiempo restante
    }
}

function detenerJuego() {
    clearInterval(temporizador);
    fondo.pause();
}

// Iniciar el temporizador cuando comienza el juego
function iniciarTemporizador() {
    temporizador = setInterval(actualizarReloj, 1000); // Actualiza cada segundo
}

// Reiniciar el temporizador cuando se reinicia el juego
function reiniciarTemporizador() {
    detenerJuego();
    tiempoRestante = 60;
    actualizarReloj();
    iniciarTemporizador();
}

// Llama a esta función cuando inicies el juego
iniciarTemporizador();
let sonidos = document.querySelector("#sonidos");
const fondo = document.querySelector("#fondo");
const escuchar = document.querySelector("#escuchar");
let span_intentos = document.querySelector("#intentos");

let reproduccionIniciada = false;

document.addEventListener("click", () => {
    if (!reproduccionIniciada) {
        fondo.play();
        reproduccionIniciada = true;
    }
});

const sonidoFondo = (e) => {
    if (fondo.volume == 0.0) {
        fondo.volume = 0.1;
        return escuchar.innerHTML = "Mutear sonido";
    }
    fondo.volume = 0.0;
    return escuchar.innerHTML = "Habilitar sonido";
};

escuchar.addEventListener("click", sonidoFondo);

const comparar = (imagen1, imagen2) => {
    intentos++;
    span_intentos.innerHTML = intentos;
    if (imagen1 == imagen2) {
        sonidos.src = "sounds/success.mp3";
        sonidos.volume = 1;
        sonidos.play();
        parejas++;
        num_parejas.innerHTML = parejas;

        // Incrementar la cantidad de parejas consecutivas
        consecutivas++;

        // Mostrar bonificación si hay más de una pareja consecutiva
        if (consecutivas > 1) {
            sonidos.src = "sounds/andersoniji.mp3";
            sonidos.volume = 1;
            sonidos.play();
            //mostrarModal(`¡Bonus x${consecutivas} por encontrar parejas consecutivas!`);
        }

        if (parejas == 8) {
            sonidos.src = "sounds/youwin.mp3";
            sonidos.volume = 0.3;
            sonidos.play();
            mostrarModal("GANASTE! BIEN HECHO VIRGO!");

            // Detener el fondo después de unos segundos
            setTimeout(() => {
                detenerJuego();
            }, 2000);

           // Mostrar el mensaje de reinicio y esperar a hacer clic
setTimeout(() => {
    calcularPuntuacionFinal();
    
    // Calcular la bonificación por parejas consecutivas (exponencial)
    const bonificacionConsecutivas = Math.pow(2, consecutivas - 1) * 20;

    // Calcular puntos por intentos y tiempo restante
    const puntosIntentos = Math.max(0, 20 - intentos) * 5;
    const puntosTiempoRestante = tiempoRestante * 2;

    // Calcular el total de puntos
    const totalPuntos = puntuacion;

    const desglosePuntos = `
        Puntuación:
        Intentos (${intentos}): ${puntosIntentos} pts
        Tiempo restante (${tiempoRestante} seg.): ${puntosTiempoRestante} pts
        Bonus por combo (${consecutivas}): ${bonificacionConsecutivas} pts
        Total: ${totalPuntos} pts
    `;

    mostrarModal(desglosePuntos);
    document.addEventListener("click", reiniciarJuegoHandler);
}, 3000);
        }
        tar_1.removeEventListener("click", darVuelta);
        tar_2.removeEventListener("click", darVuelta);
        tar_1 = tar_2 = "";
        deshabilitarCartas = false;
        return console.log("Son Iguales");
    }
    console.log("no son iguales");
    setTimeout(() => {
        tar_1.classList.add("moverse");
        tar_2.classList.add("moverse");
        sonidos.src = "sounds/lose.mp3";
        sonidos.volume = 0.3;
        sonidos.play();
    }, 500);

    setTimeout(() => {
        tar_1.classList.remove("moverse", "vuelta");
        tar_2.classList.remove("moverse", "vuelta");
        tar_1 = tar_2 = "";
        deshabilitarCartas = false;
        consecutivas = 0; // Reiniciar la cantidad de parejas consecutivas al cometer un error
    }, 1500);
};

const mostrarGameOver = (mensaje) => {
    sonidos.src = "sounds/gameover.mp3";
    sonidos.volume = 0.3;
    sonidos.play();

    // Muestra el modal con el mensaje correspondiente
    mostrarModal(mensaje);

    // No inicia automáticamente, espera a hacer clic para reiniciar
    document.addEventListener("click", reiniciarJuegoHandler);
};

const mostrarGanador = () => {
    sonidos.src = "sounds/youwin.mp3";
    sonidos.volume = 0.3;
    sonidos.play();
    calcularPuntuacionFinal(); // Calcula la puntuación final al ganar
    mostrarModal(`¡Has ganado!\nPuntuación: ${puntuacion}\nHaz clic para reiniciar`);
    document.addEventListener("click", reiniciarJuegoHandler);
};

const calcularPuntuacionFinal = () => {
    // Calcular bonificación por parejas consecutivas (exponencial)
    const bonificacionConsecutivas = Math.pow(2, consecutivas - 1) * 10;

    // Calcular puntos por intentos y tiempo restante
    const puntosIntentos = Math.max(0, 20 - intentos) * 5;
    const puntosTiempoRestante = tiempoRestante * 2;

    // Calcular el total de puntos
    const totalPuntos = puntosIntentos + puntosTiempoRestante + bonificacionConsecutivas;

    // Mostrar la puntuación detallada
    const desglosePuntos = `
        Puntuación:
        Intentos (${intentos}): ${puntosIntentos} pts
        Tiempo restante (${tiempoRestante} seg.): ${puntosTiempoRestante} pts
        Bonus por combo (${consecutivas}): ${bonificacionConsecutivas} pts
        Total: ${totalPuntos} pts
    `;

    
    mostrarModal(desglosePuntos);

    // Sumar puntos antes de asignar a la variable puntuacion
    puntuacion += totalPuntos;

     // Limitar la puntuación a la puntuación máxima
    //puntuacion = Math.min(puntuacion, puntuacionMaxima);
};
   


const darVuelta = (e) => {
    let tarjeta = e.target;
    if (tarjeta !== tar_1 && !deshabilitarCartas) {
        tarjeta.classList.add("vuelta"); //al hacer clic cambia la clase de la card a "vuelta"
        if (!tar_1) {
            return tar_1 = tarjeta;
        }
        tar_2 = tarjeta;
        deshabilitarCartas = true;
        let img1 = tar_1.querySelector('img').src;
        let img2 = tar_2.querySelector('img').src; // Corregir aquí: 'src' en lugar de 'scr'
        comparar(img1, img2);
    }
};

const reiniciarJuegoHandler = () => {
    reiniciarJuego();
    ocultarModal();
    document.removeEventListener("click", reiniciarJuegoHandler);
};

const reiniciarJuego = () => {
    // Detener el fondo actual
    fondo.pause();
    fondo.currentTime = 0;

    // Reiniciar el fondo
    fondo.src = "sounds/background.mp3";
    fondo.volume = 0.1;

    // Reiniciar las demás variables y elementos del juego
    parejas = 0;
    intentos = 0;
    tiempoRestante = 60;
    span_intentos.innerHTML = intentos;
    num_parejas.innerHTML = parejas;

    reiniciarTemporizador();

    tar_1 = tar_2 = "";
    deshabilitarCartas = false;
    consecutivas = 0; // Reiniciar la cantidad de parejas consecutivas al reiniciar el juego

    let fichas = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    fichas.sort(() => {
        return Math.random() - 0.5;
    });

    cards.forEach((tarjeta, index) => {
        tarjeta.classList.remove("vuelta");
        let img = tarjeta.querySelector("img");
        img.src = `img/img-${fichas[index]}.png`;

        tarjeta.addEventListener("click", darVuelta);
    });

    // Reproducir el fondo después de reiniciar
    fondo.play();
};

// Iniciar el juego
reiniciarJuego();

//codigo pre beta ... ok 
