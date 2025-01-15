let sintomasConfirmados = [];

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

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

function armazenarSintomas() {
    const checkboxes = document.querySelectorAll('input[name="sintomas"]:checked');
    const sintomasSelecionados = Array.from(checkboxes).map(checkbox => checkbox.value);
    
    const sintomasArmazenados = JSON.parse(localStorage.getItem('sintomasSelecionados')) || [];
    
    const todosSintomas = [...new Set([...sintomasArmazenados, ...sintomasSelecionados])]; 
    localStorage.setItem('sintomasSelecionados', JSON.stringify(todosSintomas));
}

async function confirmarSintomas() {
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (!userId) {
        console.error("Usuário não autenticado.");
        return;
    }

    const sintomasSelecionados = JSON.parse(localStorage.getItem('sintomasSelecionados')) || []; 

    try {
        const docRef = await addDoc(collection(db, 'pacientes', userId, 'cad', userId, 'sintomas'), {
            sintomas: sintomasSelecionados,
            timestamp: serverTimestamp()
        });
        console.log("Documento escrito com ID: ", docRef.id);

        const sintomasConfirmados = [...sintomasSelecionados]; 

        localStorage.removeItem('sintomasSelecionados'); 
        window.location.href = '/tratamento'; 
    } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('proximaSintomas2')) {
        document.getElementById('proximaSintomas2').addEventListener('click', () => {
            armazenarSintomas();
            window.location.href = '/sintomas2'; 
        });
    }

    if (document.getElementById('proximaSintomas3')) {
        document.getElementById('proximaSintomas3').addEventListener('click', () => {
            armazenarSintomas();
            window.location.href = '/sintomas3'; 
        });
    }

    if (document.getElementById('confirmarSintomas')) {
        document.getElementById('confirmarSintomas').addEventListener('click', () => {
            armazenarSintomas();
            window.location.href = '/confirmar-sintomas'; 
        });
    }

    if (document.getElementById('lista-sintomas')) {
        exibirSintomas();
    }

    if (document.getElementById('Confirmar5')) {
        document.getElementById('Confirmar5').addEventListener('click', () => {
            confirmarSintomas(); 
        });
    }

    if (document.getElementById('voltar4')) {
        document.getElementById('voltar4').addEventListener('click', voltar4);
    }

    if (document.getElementById('voltar3')) {
        document.getElementById('voltar3').addEventListener('click', voltar3);
    }

    if (document.getElementById('voltar2')) {
        document.getElementById('voltar2').addEventListener('click', voltar2);
    }

    if (document.getElementById('voltar1')) {
        document.getElementById('voltar1').addEventListener('click', voltar1);
    }

    if (document.getElementById('RETIRAR')) {
        document.getElementById('RETIRAR').addEventListener('click', RETIRAR);
    }
});

function voltar4() {
    sintomasConfirmados = []; 
    localStorage.removeItem('sintomasSelecionados');

    const listaSintomas = document.getElementById('lista-sintomas');
    if (listaSintomas) {
        listaSintomas.innerHTML = '';
    }

    window.location.href = '/sintomas1';
}

function voltar3() {
    sintomasConfirmados = [];
    localStorage.removeItem('sintomasSelecionados');

    const listaSintomas = document.getElementById('lista-sintomas');
    if (listaSintomas) {
        listaSintomas.innerHTML = '';
    }
    window.location.href = '/sintomas2';
}

function voltar2() {
    sintomasConfirmados = []; 
    localStorage.removeItem('sintomasSelecionados');

    const listaSintomas = document.getElementById('lista-sintomas');
    if (listaSintomas) {
        listaSintomas.innerHTML = '';
    }
    window.location.href = '/sintomas1';
}

function voltar1() {
    sintomasConfirmados = []; 
    localStorage.removeItem('sintomasSelecionados');

    const listaSintomas = document.getElementById('lista-sintomas');
    if (listaSintomas) {
        listaSintomas.innerHTML = '';
    }
}

function exibirSintomas() {
    const listaSintomas = document.getElementById('lista-sintomas');
    if (!listaSintomas) {
        console.error("Elemento com ID 'lista-sintomas' não encontrado.");
        return;
    }

    const sintomasSelecionados = JSON.parse(localStorage.getItem('sintomasSelecionados')) || [];
    listaSintomas.innerHTML = ''; 
    sintomasSelecionados.forEach(sintoma => {
        const li = document.createElement('li');
        li.textContent = sintoma;
        listaSintomas.appendChild(li);
    });
}

function RETIRAR() {
    sintomasConfirmados = []; 
    localStorage.removeItem('sintomasSelecionados');

    const listaSintomas = document.getElementById('lista-sintomas');
    if (listaSintomas) {
        listaSintomas.innerHTML = '';
    }
    
    window.location.href = '/index';
}