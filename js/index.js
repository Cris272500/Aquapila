document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            navLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");
        });
    });

    const waterPath = document.getElementById("water"); // Asegúrate de que el ID sea correcto

    const animarAgua = () => {
        const time = Date.now() / 1000;
        const wave1 = Math.sin(time) * 5; // Amplitud de la primera ola
        const wave2 = Math.sin(time * 1.5) * 3; // Amplitud de la segunda ola

        // Define el camino original
        const originalD = "M10,50 Q90,60 170,50 L170,170 Q90,180 10,170 Z";

        const dynamicWidth = 160 + wave1;
        
        // Crea un nuevo camino con las olas
        const newD = `M10,${50 + wave1} Q${40 + dynamicWidth / 2},${60 + wave2} ${10 + dynamicWidth},${50 + wave1} L${10 + dynamicWidth},170 Q${40 + dynamicWidth / 2},180 10,170 Z`;
        waterPath.setAttribute('d', newD);
        requestAnimationFrame(animarAgua); // Llama a la siguiente animación
    }

    animarAgua(); // Inicia la animación
});
