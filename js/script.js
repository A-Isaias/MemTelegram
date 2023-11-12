const cards = document.querySelectorAll(".card");
const num_parejas = document.querySelector(".container h2 span");
const tiempoRestanteElemento = document.getElementById("tiempo-restante");

const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");

const mostrarModal = (mensaje) => {
    modalMessage.innerHTML = mensaje.replace(/\n/g, "<br>");
    modal.style.display = "block";
};

const ocultarModal = () => {
    modal.style.display = "none";
};

let tar_1,
    tar_2,
    deshabilitarCartas = false;
let parejas = 0;
let intentos = 0;
let puntuacion = 0;
let consecutivas = 0;
const puntuacionMaxima = 5000;

let tiempoRestante = 60;
let temporizador;

function actualizarReloj() {
    tiempoRestanteElemento.textContent = `Tiempo restante: ${tiempoRestante} segundos`;

    if (tiempoRestante === 0) {
        detenerJuego();
        mostrarGameOver("GAME OVER o sea perdiste culeado");
    } else {
        tiempoRestante--;
    }
}

function detenerJuego() {
    clearInterval(temporizador);
    fondo.pause();
}

function iniciarTemporizador() {
    temporizador = setInterval(actualizarReloj, 1000);
}

function reiniciarTemporizador() {
    detenerJuego();
    tiempoRestante = 60;
    actualizarReloj();
    iniciarTemporizador();
}

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
        return (escuchar.innerHTML = "Mutear sonido");
    }
    fondo.volume = 0.0;
    return (escuchar.innerHTML = "Habilitar sonido");
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

        consecutivas++;

        if (consecutivas > 1) {
            sonidos.src = "sounds/andersoniji.mp3";
            sonidos.volume = 1;
            sonidos.play();
        }

        if (parejas == 8) {
            sonidos.src = "sounds/youwin.mp3";
            sonidos.volume = 0.3;
            sonidos.play();
            mostrarModal("GANASTE! BIEN HECHO VIRGO!");

            setTimeout(() => {
                detenerJuego();
            }, 2000);

            setTimeout(() => {
                calcularPuntuacionFinal();

                const bonificacionConsecutivas = Math.pow(2, consecutivas - 1) * 20;

                const puntosIntentos = Math.max(0, 20 - intentos) * 5;
                const puntosTiempoRestante = tiempoRestante * 2;

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
        consecutivas = 0;
    }, 1500);
};

const mostrarGameOver = (mensaje) => {
    sonidos.src = "sounds/gameover.mp3";
    sonidos.volume = 0.3;
    sonidos.play();

    mostrarModal(mensaje);

    document.addEventListener("click", reiniciarJuegoHandler);
};

const mostrarGanador = () => {
    sonidos.src = "sounds/youwin.mp3";
    sonidos.volume = 0.3;
    sonidos.play();

    mostrarModal(
        `¡Has ganado!\nPuntuación: ${puntuacion}\nHaz clic para reiniciar`
    );

    document.addEventListener("click", reiniciarJuegoHandler);
};

const calcularPuntuacionFinal = () => {
    const bonificacionConsecutivas = Math.pow(2, consecutivas - 1) * 10;

    const puntosIntentos = Math.max(0, 20 - intentos) * 5;
    const puntosTiempoRestante = tiempoRestante * 2;

    const totalPuntos =
        puntosIntentos + puntosTiempoRestante + bonificacionConsecutivas;

    const desglosePuntos = `
        Puntuación:
        Intentos (${intentos}): ${puntosIntentos} pts
        Tiempo restante (${tiempoRestante} seg.): ${puntosTiempoRestante} pts
        Bonus por combo (${consecutivas}): ${bonificacionConsecutivas} pts
        Total: ${totalPuntos} pts
    `;

    mostrarModal(desglosePuntos);

    puntuacion += totalPuntos;

    puntuacion = Math.min(puntuacion, puntuacionMaxima);
};

const darVuelta = (e) => {
    let tarjeta = e.target;
    if (tarjeta !== tar_1 && !deshabilitarCartas) {
        tarjeta.classList.add("vuelta");
        if (!tar_1) {
            return (tar_1 = tarjeta);
        }
        tar_2 = tarjeta;
        deshabilitarCartas = true;
        let img1 = tar_1.querySelector("img").src;
        let img2 = tar_2.querySelector("img").src;
        comparar(img1, img2);
    }
};

const reiniciarJuegoHandler = () => {
    reiniciarJuego();
    ocultarModal();
    document.removeEventListener("click", reiniciarJuegoHandler);
};

const reiniciarJuego = () => {
    fondo.pause();
    fondo.currentTime = 0;

    fondo.src = "sounds/background.mp3";
    fondo.volume = 0.1;

    parejas = 0;
    intentos = 0;
    tiempoRestante = 60;
    span_intentos.innerHTML = intentos;
    num_parejas.innerHTML = parejas;

    reiniciarTemporizador();

    tar_1 = tar_2 = "";
    deshabilitarCartas = false;
    consecutivas = 0;

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

    fondo.play();
};

reiniciarJuego();
