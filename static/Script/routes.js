import { idadeUsuario } from './confirmar-user.js';

function voltar1() {
    if (idadeUsuario >= 16 && idadeUsuario <= 17) {
        window.location.href = "/especialidade"; 
    } else {
        window.location.href = "/confirmar";  
    }
}
document.getElementById("voltar1").addEventListener("click", voltar1);