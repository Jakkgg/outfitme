// Muestra la sección de perfil
document.getElementById("profile-link").addEventListener("click", function() {
    document.getElementById("profile-section").classList.toggle("hidden");
    document.querySelector("main").classList.add("hidden"); // Oculta la sección principal
});

// Lógica para cambiar la foto de perfil
document.getElementById("change-pic-btn").addEventListener("click", function() {
    // Aquí puedes integrar un input de tipo file para elegir una imagen
    alert("Aquí podrías cargar una nueva foto");
});
