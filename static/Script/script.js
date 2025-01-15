import { idadeUsuario } from './confirmar-user.js';

function Confirmar() {
    if (idadeUsuario >= 16 && idadeUsuario <= 17) {
        window.location.href = "/especialidade";  
    } else {
        window.location.href = "/sintomas1";  
    }
}
document.getElementById("Confirmar").addEventListener("click", Confirmar);

const inputCPF = document.querySelector('#CPF');
if (inputCPF) {
    inputCPF.addEventListener('keypress', () => {
        let inputLength = inputCPF.value.length;
        if (inputLength === 3 || inputLength === 7) {
            inputCPF.value += '.';
        } else if (inputLength === 11) {
            inputCPF.value += '-';
        }
    });
}

const inputCarteira = document.querySelector('#carteira');
if (inputCarteira) {
    inputCarteira.addEventListener('keypress', () => {
        let input1Length = inputCarteira.value.length;
        if (input1Length === 3 || input1Length === 8) {
            inputCarteira.value += '.';
        } else if (input1Length === 13) {
            inputCarteira.value += '.';
        }
    });
}