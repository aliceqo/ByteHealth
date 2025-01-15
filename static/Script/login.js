import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC2LhXcIgmjVM6BL3l-tSN4521_Zpz8e-c",
    authDomain: "escriptas-bd.firebaseapp.com",
    projectId: "escriptas-bd",
    storageBucket: "escriptas-bd.appspot.com",
    messagingSenderId: "758156680319",
    appId: "1:758156680319:web:fcdd553ee579c9d76d734a",
    measurementId: "G-9V5NY7SRPV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Login realizado com sucesso...");
            window.location.href = "/confirmar";
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});
