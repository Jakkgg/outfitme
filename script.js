// Configuración de Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-project-id.firebaseapp.com",
  projectId: "tu-project-id",
  storageBucket: "tu-project-id.appspot.com",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id",
};

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
      document.getElementById("profile-section").classList.remove("hidden"); // Mostrar la sección del perfil
      document.getElementById("home-section").classList.add("hidden"); // Ocultar la sección de inicio
      document.getElementById("profile-img").src = user.photoURL; // Mostrar la foto del perfil
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
    document.getElementById("profile-img").src = user.photoURL; // Mostrar foto de perfil
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

const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-project-id.firebaseapp.com",
  projectId: "tu-project-id",
  storageBucket: "tu-project-id.appspot.com",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id",
};

  }
}
