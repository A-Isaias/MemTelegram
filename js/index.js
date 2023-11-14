
const instruccionesJuego = `
¡Bienvenido al Memory Game del Grupo de telegram de Anderson Blog Ride!<br>
<br> 
<strong>Objetivo del Juego:</strong> Encuentra todas las parejas de cartas iguales antes de que<br>
se agote el tiempo.Cada vez que encuentres una pareja, ganarás puntos.<br>
<br>
<strong>Cómo Jugar:</strong>Haz clic en las cartas para darles vuelta y revelar la imagen oculta.<br>
Encuentra todas las parejas antes de que el tiempo se agote.<br>
<br>
<strong>Puntuación:</strong>Cada pareja encontrada te otorga puntos.<br>
Completa el juego rápidamente para obtener más puntos.<br>
¡Cuidado con el tiempo! Tu puntuación disminuirá si tardas demasiado.<br>
<br>
<strong>Bonus:</strong>Combina varias parejas consecutivas para obtener bonificaciones.<br>
Utiliza tu memoria y habilidades para maximizar tu puntuación.<br>
<br>
¡Diviértete, comparte tus puntuaciones en el grupo y que el PAAWERR te acompañe!!<BR>
<BR>
HAZ CLICK PARA VOLVER AL MENU PRINCIPAL
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

    // Agregar evento para cerrar el modal al hacer clic 
    window.onclick = function(event) {
        const modalContent = modalInstrucciones.querySelector(".modal-content-instrucciones");
        if (event.target === modalInstrucciones || modalContent.contains(event.target)) {
            modalInstrucciones.style.display = "none";
        }
    };

    // Agregar evento para cerrar el modal al hacer clic en el botón de cierre
    closeButton.onclick = function() {
        modalInstrucciones.style.display = "none";
    };
}