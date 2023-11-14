
const instruccionesJuego = `
  Instrucciones del Juego - Memory Game

  ¡Bienvenido al Memory Game!

  Objetivo del Juego:
  Encuentra todas las parejas de cartas iguales antes de que se agote el tiempo. Cada vez que encuentres una pareja, ganarás puntos. ¡Intenta conseguir la mayor puntuación posible!

  Cómo Jugar:

  Haz clic en las cartas para darles vuelta y revelar la imagen oculta.
  Intenta recordar la ubicación de cada imagen para encontrar las parejas.
  Encuentra todas las parejas antes de que el tiempo se agote.

  Puntuación:

  Cada pareja encontrada te otorga puntos.
  Completa el juego rápidamente para obtener más puntos.
  ¡Cuidado con el tiempo! Tu puntuación disminuirá si tardas demasiado.

  Bonus:

  Combina varias parejas consecutivas para obtener bonificaciones.
  Utiliza tu memoria y habilidades para maximizar tu puntuación.

  ¡Diviértete y demuestra tus habilidades en este desafiante Memory Game!
`;

function iniciarJuego() {
    const dificultad = document.getElementById("dificultad").value;
    

    // Aquí puedes pasar la dificultad y la configuración de sonido al juego
    window.location.href = `game.html?dificultad=${dificultad}`;
    
}

function mostrarInstrucciones() {
    const modalInstrucciones = document.getElementById("modal-instrucciones");
    const modalContent = modalInstrucciones.querySelector(".modal-content-instrucciones");
    const closeButton = modalInstrucciones.querySelector(".close-button");

    // Asignar el contenido de las instrucciones al modal
    modalContent.innerHTML = instruccionesJuego;

    // Mostrar el modal
    modalInstrucciones.style.display = "block";

    // Agregar evento para cerrar el modal al hacer clic fuera del contenido
    window.onclick = function(event) {
        if (event.target === modalInstrucciones) {
            modalInstrucciones.style.display = "none";
        }
    };

    // Agregar evento para cerrar el modal al hacer clic en el botón de cierre
    closeButton.onclick = function() {
        modalInstrucciones.style.display = "none";
    };
}