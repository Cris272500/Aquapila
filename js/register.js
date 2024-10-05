document.addEventListener('DOMContentLoaded', () => {
    const btnRegister = document.querySelector('.btnRegister');

    const nombre = document.querySelector('.nombre');
    const correo = document.querySelector('.correo');
    const password = document.querySelector('.contra');
    const confirmPassword = document.querySelector('.confirmarContra');

    
    btnRegister.addEventListener('click', () => {
        event.preventDefault();
        if (nombre.value === '' || correo.value === '' || password.value === '' || confirmPassword.value === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Los campos deben ser llenados",
            });
        } else if (password.value !== confirmPassword.value) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Las contraseñas deben de coincidir",
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "Creado",
                text: "Cuenta creada con exito",
            }).then(() => {    
                window.location.href = 'index.html';
            });
        }
    })
})