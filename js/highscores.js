document.addEventListener("DOMContentLoaded", () => {
    // Función para cargar y mostrar los highscores
    const mostrarHighscores = () => {
        fetch("db/highscores.json") // Ajusta la ruta aquí
            .then((response) => response.json())
            .then((highscores) => {
                const highscoresList = document.getElementById("highscores-list");
                highscoresList.innerHTML = "<h2>Top 10 Highscores</h2>";

                highscores.forEach((score) => {
                    highscoresList.innerHTML += `<p>${score.posicion}. ${score.nombre} - ${score.puntuacion} PTS</p>`;
                });

                // Agregar botones
                const buttonsContainer = document.createElement("div");
                buttonsContainer.innerHTML = "<br><button onclick='volverAlMenu()'>Volver al Menú</button> <button onclick='reiniciarJuego()'>Reiniciar Juego</button>";
                highscoresList.appendChild(buttonsContainer);
            })
            .catch((error) => console.error("Error al cargar highscores:", error));
    };

    // Cargar y mostrar los highscores al cargar la página
    mostrarHighscores();
});

// Función para volver al menú
const volverAlMenu = () => {
    window.location.href = "index.html"; // Cambia la ruta según tu estructura de carpetas
};

// Función para reiniciar el juego
const reiniciarJuego = () => {
    window.location.href = "game.html"; // Cambia la ruta según tu estructura de carpetas
};
