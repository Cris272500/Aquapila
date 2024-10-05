document.addEventListener("DOMContentLoaded", () => {
  // aca cuando se carga la pagina el valor por defecto que va a tener es del de 70 por ciento

  const barra = document.querySelector(".progress-bar");
  const texto = document.querySelector(".capacity-text");
  let cantidad_notificaciones = 0;

  texto.textContent = `Aquapila está al ${barra.getAttribute(
    "aria-valuenow",
    40
  )}% de su capacidad`;

  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // microfono
  // aqui va la logica del microfono
  const microfono = document.querySelector(".btnReproducir");

  microfono.addEventListener("click", (event) => {
    event.preventDefault();

    // Obtener los textos
    const texto1 = document.querySelector(".texto1").textContent;
    const texto2 = document.querySelector(".texto2").textContent;
    const texto3 = document.querySelector(".texto3").textContent;
    const texto4 = document.querySelector(".texto4").textContent;
    const texto5 = document.querySelector(".texto5").textContent; // Nuevo texto
    const texto6 = document.querySelector(".texto6").textContent; // Nuevo texto

    // Crear el objeto SpeechSynthesisUtterance para el primer texto
    const speech1 = new SpeechSynthesisUtterance(texto1);
    speech1.lang = "es-ES";

    // Definir el evento onend para el primer texto
    speech1.onend = () => {
      // Crear el objeto SpeechSynthesisUtterance para el segundo texto
      const speech2 = new SpeechSynthesisUtterance(texto2);
      speech2.lang = "es-ES";

      // Definir el evento onend para el segundo texto
      speech2.onend = () => {
        // Crear el objeto SpeechSynthesisUtterance para el tercer texto
        const speech3 = new SpeechSynthesisUtterance(texto3);
        speech3.lang = "es-ES";

        // Definir el evento onend para el tercer texto
        speech3.onend = () => {
          // Crear el objeto SpeechSynthesisUtterance para el cuarto texto
          const speech4 = new SpeechSynthesisUtterance(texto4);
          speech4.lang = "es-ES";

          // Definir el evento onend para el cuarto texto
          speech4.onend = () => {
            // Crear el objeto SpeechSynthesisUtterance para el quinto texto
            const speech5 = new SpeechSynthesisUtterance(texto5);
            speech5.lang = "es-ES";

            // Definir el evento onend para el quinto texto
            speech5.onend = () => {
              // Crear el objeto SpeechSynthesisUtterance para el sexto texto
              const speech6 = new SpeechSynthesisUtterance(texto6);
              speech6.lang = "es-ES";

              // Agregar un pequeño retraso antes de hablar el sexto texto
              setTimeout(() => {
                window.speechSynthesis.speak(speech6);
              }, 500); // Pausa de 500 milisegundos (0.5 segundos)
            };

            // Agregar un pequeño retraso antes de hablar el quinto texto
            setTimeout(() => {
              window.speechSynthesis.speak(speech5);
            }, 500); // Pausa de 500 milisegundos (0.5 segundos)
          };

          // Agregar un pequeño retraso antes de hablar el cuarto texto
          setTimeout(() => {
            window.speechSynthesis.speak(speech4);
          }, 500); // Pausa de 500 milisegundos (0.5 segundos)
        };

        // Agregar un pequeño retraso antes de hablar el tercer texto
        setTimeout(() => {
          window.speechSynthesis.speak(speech3);
        }, 500); // Pausa de 500 milisegundos (0.5 segundos)
      };

      // Agregar un pequeño retraso antes de hablar el segundo texto
      setTimeout(() => {
        window.speechSynthesis.speak(speech2);
      }, 500); // Pausa de 500 milisegundos (0.5 segundos)
    };

    // Iniciar la reproducción del primer texto
    window.speechSynthesis.speak(speech1);
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
    const newD = `M10,${50 + wave1} Q${40 + dynamicWidth / 2},${60 + wave2} ${
      10 + dynamicWidth
    },${50 + wave1} L${10 + dynamicWidth},170 Q${
      40 + dynamicWidth / 2
    },180 10,170 Z`;
    waterPath.setAttribute("d", newD);
    requestAnimationFrame(animarAgua); // Llama a la siguiente animación
  };

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
      denyButtonText: `Cancelar`,
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
            notification.textContent = "";
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
    });
  });
});
