sonidos.src = "sounds/smack my bitch 16 bis.mp3";
sonidos.volume = 0.3;
sonidos.play();

function iniciarJuego() {
    const dificultad = document.getElementById("dificultad").value;
    

    // Aquí puedes pasar la dificultad y la configuración de sonido al juego
    window.location.href = `game.html?dificultad=${dificultad}`;
    
}