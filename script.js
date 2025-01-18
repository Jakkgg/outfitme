// Función para manejar el clic en el enlace de Settings
document.querySelector('a[href="#"]').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del enlace
    alert('Configuración de la página: en desarrollo.');
});
