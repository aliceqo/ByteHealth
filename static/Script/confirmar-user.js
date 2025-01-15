import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

let idadeUsuario;

function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
}

async function buscarDadosPaciente(userId) {
    try {
        const pacienteDocRef = doc(db, "pacientes", userId, "cad", userId);
        
        const docSnap = await getDoc(pacienteDocRef);
        
        if (docSnap.exists()) {
            const docData = docSnap.data();
            console.log("Dados do paciente:", docData);

            idadeUsuario = calcularIdade(docData.dataNascimento); 
            console.log("Idade do paciente:", idadeUsuario);

            document.getElementById("nome_usuario").textContent = `Você é ${docData.nome}`;
            document.getElementById("numero_sus").textContent = docData.sus || "Não disponível";
            document.getElementById("idade_usuario").textContent = `Idade: ${idadeUsuario} anos`;
        } else {
            console.log("Nenhum documento encontrado na subcoleção 'cad'");
            document.getElementById("nome_usuario").textContent = "Usuário não encontrado";
            document.getElementById("numero_sus").textContent = "";
            document.getElementById("idade_usuario").textContent = "";
        }
    } catch (error) {
        console.error("Erro ao buscar documento:", error);
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Usuário autenticado com UID:", user.uid); 
        buscarDadosPaciente(user.uid); 
    } else {
        console.log("Usuário não autenticado.");
        document.getElementById("nome_usuario").textContent = "Usuário não autenticado";
        document.getElementById("numero_sus").textContent = "";
    }
});

export { idadeUsuario };