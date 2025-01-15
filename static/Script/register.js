import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { addDoc, collection} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
const db = getFirestore(app);

console.log("register.js carregado");

document.addEventListener("DOMContentLoaded", function () {
    const submit = document.getElementById('submit');

    if (!submit) {
        console.error("Botão de submissão não encontrado!");
        return;
    }

    submit.addEventListener("click", async function (event) {
        event.preventDefault(); 
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const nome = document.getElementById('nomePaciente').value;
        const cpf = document.getElementById('cpf').value;
        const cartaoSus = document.getElementById('cartao-sus').value;
        const telefone = document.getElementById('telefone').value;
        const dataNascimento = document.getElementById('data-nascimento').value;
        const endereco = document.getElementById('endereco').value;
        const sexo = document.getElementById('sexo').value;

        if (!nome || !cpf || !dataNascimento || !email || !endereco || !sexo || !cartaoSus || !telefone) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            const pacienteDocRef = doc(db, 'pacientes', user.uid);

            await setDoc(doc(pacienteDocRef, 'cad', user.uid), {  
                uid: user.uid, 
                nome: nome,
                cpf: cpf,
                dataNascimento: dataNascimento,
                email: email,
                endereco: endereco,
                sexo: sexo,
                sus: cartaoSus,
                telefone: telefone
            });

            alert("Conta criada com sucesso e dados armazenados!");
        
        } catch (error) {
            alert(error.message);
        }
    });
});