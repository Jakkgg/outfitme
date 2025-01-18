<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OutfitMe</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav>
    <ul>
      <li><a href="#" id="home-link">Inicio</a></li>
      <li><a href="#" id="profile-link">Perfil</a></li>
      <li><a href="#" id="register-link">Registrarse</a></li>
      <li><a href="#" id="login-link">Iniciar sesión</a></li>
    </ul>
  </nav>

  <!-- Secciones -->
  <section id="home-section">
    <h1>Bienvenido a OutfitMe</h1>
    <button id="google-login-btn">Iniciar sesión con Google</button>
  </section>

  <section id="profile-section" class="hidden">
    <h2>Perfil</h2>
    <img id="profile-img" alt="Foto de perfil">
    <p id="user-name"></p>
    <button id="logout-btn">Cerrar sesión</button>
  </section>

  <section id="register-section" class="hidden">
    <h2>Registrarse</h2>
    <!-- Formulario de registro (si es necesario) -->
  </section>

  <section id="login-section" class="hidden">
    <h2>Iniciar sesión</h2>
    <!-- Formulario de login (si es necesario) -->
  </section>

  <!-- Firebase -->
  <script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js"></script>

  <script type="module">
    // Configuración de tu proyecto Firebase
    const firebaseConfig = {
      apiKey: "tu-api-key",
      authDomain: "tu-project-id.firebaseapp.com",
      projectId: "tu-project-id",
      storageBucket: "tu-project-id.appspot.com",
      messagingSenderId: "tu-messaging-sender-id",
      appId: "tu-app-id",
    };

    // Inicializa Firebase
    import { initializeApp } from 'firebase/app';
    import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
    import { getFirestore, collection, addDoc } from 'firebase/firestore';

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Iniciar sesión con Google
    document.getElementById("google-login-btn").addEventListener("click", function() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          console.log("Usuario autenticado:", user);
          alert("Bienvenido, " + user.displayName);
          document.getElementById("profile-section").classList.remove("hidden");
          document.getElementById("home-section").classList.add("hidden");
          document.getElementById("profile-img").src = user.photoURL;
          document.getElementById("user-name").textContent = user.displayName;
        })
        .catch((error) => {
          console.error("Error en inicio de sesión: ", error.message);
          alert("Error en inicio de sesión");
        });
    });

    // Desloguear al usuario
    document.getElementById("logout-btn").addEventListener("click", function() {
      signOut(auth).then(() => {
        alert("Has cerrado sesión.");
        document.getElementById("profile-section").classList.add("hidden");
        document.getElementById("home-section").classList.remove("hidden");
      }).catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
    });

    // Verificar si el usuario está autenticado
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuario autenticado:", user);
        document.getElementById("profile-section").classList.remove("hidden");
        document.getElementById("home-section").classList.add("hidden");
        document.getElementById("profile-img").src = user.photoURL;
        document.getElementById("user-name").textContent = user.displayName;
      } else {
        console.log("Usuario no autenticado");
      }
    });

    // Añadir una publicación (opcional)
    async function addPost(postContent) {
      try {
        const docRef = await addDoc(collection(db, "posts"), {
          content: postContent,
          createdAt: new Date(),
        });
        console.log("Publicación añadida con ID:", docRef.id);
      } catch (e) {
        console.error("Error añadiendo publicación: ", e);
      }
    }
  </script>
</body>
</html>
