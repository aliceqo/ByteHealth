import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

const cadastrar = document.querySelector('button[name=cadastrar-btn]');
cadastrar.addEventListener('click', () => {
    const formData = {
        nome: document.querySelector('input[name=nome]').value,
        email: document.querySelector('input[name=email]').value,
        senha: document.querySelector('input[name=senha]').value,
        cpf: document.querySelector('input[name=cpf]').value,
        cartaoSus: document.querySelector('input[name=sus]').value,
        telefone: document.querySelector('input[name=telefone]').value,
        dataNascimento: document.querySelector('input[name=data-nascimento]').value,
        endereco: document.querySelector('input[name=endereco]').value,
        sexo: document.querySelector('select[name=sexo]').value
    };

    firebase.auth().createUserWithEmailAndPassword(formData.email, formData.senha)
        .then(data => {
            const uid = data.user.uid;

            const pacientes = firebase.firestore().collection('pacientes');
            users.doc(uid).set({

                email: formData.email,
                cpf: formData.cpf,
                cartaoSus: formData.cartaoSus,
                telefone: formData.telefone,
                dataNascimento: formData.dataNascimento,
                endereco: formData.endereco,
                nome: formData.nome,
                sexo: formData.sexo,
                uid: uid 
            });
            alert('Conta criada com sucesso')
        })
    .catch(error => {
        if (error.code == 'auth/email-already-in-use') {
            alert('Esse e-mail ja esta sendo utilizado')
        } else {
            alert(error.message);
        }
        console.log(error);
    });
});
