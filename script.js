// Función para ir a la página principal (index.html)
document.getElementById("home-link").addEventListener("click", function() {
    window.location.href = "index.html"; // Cambia a la página principal
});

// Muestra la sección de perfil
document.getElementById("profile-link").addEventListener("click", function() {
    document.getElementById("profile-section").classList.toggle("hidden");
    document.querySelector("main").classList.add("hidden"); // Oculta la sección principal
});

// Lógica para cambiar la foto de perfil
document.getElementById("change-pic-btn").addEventListener("click", function() {
    // Creamos un input de tipo file para seleccionar la imagen
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/png, image/jpeg'; // Solo permite PNG o JPG

    fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("profile-img").src = e.target.result; // Cambia la imagen de perfil
            };
            reader.readAsDataURL(file);
        }
    });

    fileInput.click(); // Abre el explorador de archivos
});
