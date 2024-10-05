document.addEventListener("DOMContentLoaded", () => {

    // aca cuando se carga la pagina el valor por defecto que va a tener es del de 70 por ciento

    const barra = document.querySelector(".progress-bar");
    const texto = document.querySelector(".capacity-text");
    let cantidad_notificaciones = 0;


    texto.textContent = `Aquapila está al ${barra.getAttribute("aria-valuenow", 40)}% de su capacidad`;

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


    // Codigo cuando le de click al boton liberar agua
    const formLiberar = document.querySelector("#register-form");
    const btnLiberar = document.querySelector(".btnLiberar");

    const lista_notificaciones = document.querySelector(".lista_not");

    
    btnLiberar.addEventListener("click", () => {

        event.preventDefault();

        const progressBar = document.querySelector(".progress-bar");
        const capacityText = document.querySelector(".capacity-text");
    
        let currentCapacity = parseInt(progressBar.getAttribute("aria-valuenow"));

        if (currentCapacity === 0) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No tienes agua!",
            });
            return;
        }
        
        //alert("Continuaste chele")
    
        const notification = document.querySelector(".notification"); // esto es un span

        Swal.fire({
            title: "¿Estás seguro de liberar agua?",
            showDenyButton: true,
            confirmButtonText: "Aceptar",
            denyButtonText: `Cancelar`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire("Agua liberada del tanque", "", "success").then(() => {
                // Disminuir el valor en 10

                if (currentCapacity > 0) {
                    currentCapacity -= 10;
                }

                // mandamos una notificacion si la persona llega a una cantidad baja de agua
                if (currentCapacity >= 10 && currentCapacity <= 30) {
                    notification.textContent = '';
                    notification.classList.add("notification-count");
                    cantidad_notificaciones += 1;

                    // vamos llenando el ul
                    const nueva_notificacion = document.createElement("li");
                    const nuevoEnlace = document.createElement("a");

                    nuevoEnlace.textContent = `Notificación ${cantidad_notificaciones}`;
                    nuevoEnlace.href = "#";

                    nueva_notificacion.appendChild(nuevoEnlace);

                    lista_notificaciones.appendChild(nueva_notificacion);

                    notification.textContent = cantidad_notificaciones;

                    // le sumamos dos notificaciones
                }
    
                // actualizamos los valores

                progressBar.style.width = `${currentCapacity}%`;
                progressBar.setAttribute("aria-valuenow", currentCapacity);
                capacityText.textContent = `Aquapila está al ${currentCapacity}% de su capacidad`;
                });
            } else if (result.isDenied) {
              Swal.fire("Liberación de agua interrumpida", "", "error");
            }
          })
        
    });

});
