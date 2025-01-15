import { idadeUsuario } from './confirmar-user.js';

function Confirmar6() {
    const especialidadeSelecionada = localStorage.getItem('especialidadeSelecionada');
    console.log(`Especialidade recuperada: ${especialidadeSelecionada}`); 

    console.log(`Idade: ${idadeUsuario}`); 

    let senhaGeral = Number(localStorage.getItem('senhaGeral')) || 1;
    let senhaPreferencial = Number(localStorage.getItem('senhaPreferencial')) || 1;
    let senhaPediatra = Number(localStorage.getItem('senhaPediatra')) || 1;
    let senhaPrefPediatra = Number(localStorage.getItem('senhaPrefPediatra')) || 1;

    let senha = null;
    let tipo = '';

    if (especialidadeSelecionada === 'Pediatria') {
        tipo = "Pediatra";
    } else if (especialidadeSelecionada === 'Clinico') {
        tipo = "Geral";
    } else if (idadeUsuario <= 3){
        tipo = "Pediatra Preferencial";
    } else if (idadeUsuario > 3 && idadeUsuario < 16){
        tipo = "Pediatra";
    } else if (idadeUsuario >= 18 && idadeUsuario < 60){  
        tipo = "Geral";
    } else if (idadeUsuario >= 60){
        tipo = "Preferencial";
    }

    console.log(`Idade: ${idadeUsuario}, Tipo: ${tipo}, Senha antes: ${senha}`);

    if (tipo === "Preferencial") {
        senha = senhaPreferencial;
    } else if (tipo === "Pediatra Preferencial") {
        senha = senhaPrefPediatra;
    } else if (tipo === "Pediatra") {
        senha = senhaPediatra;
    } else if (tipo === "Geral") {
        senha = senhaGeral;
    } else {
        console.error('Tipo de senha não reconhecido.');
        return;
    }

    console.log(`Idade: ${idadeUsuario}, Tipo: ${tipo}, Senha antes: ${senha}`);

    localStorage.setItem('senha', senha);
    localStorage.setItem('tipo', tipo);

    if (tipo === "Preferencial") {
        senhaPreferencial = (senhaPreferencial % 200) + 1;
        localStorage.setItem('senhaPreferencial', senhaPreferencial);
    } else if (tipo === "Pediatra Preferencial") {
        senhaPrefPediatra = (senhaPrefPediatra % 200) + 1;
        localStorage.setItem('senhaPrefPediatra', senhaPrefPediatra);
    } else if (tipo === "Pediatra") {
        senhaPediatra = (senhaPediatra % 200) + 1;
        localStorage.setItem('senhaPediatra', senhaPediatra);
    } else if (tipo === "Geral") {
        senhaGeral = (senhaGeral % 200) + 1;
        localStorage.setItem('senhaGeral', senhaGeral);
    }

    console.log(`Senha: ${senha}, Tipo de Senha: ${tipo}, Senha depois: ${localStorage.getItem('senha')}`);

    setTimeout(() => {
        localStorage.removeItem('especialidadeSelecionada');

        window.location.href = "/retirar"; 
    }, 1000);
}

document.getElementById("Confirmar6").addEventListener("click", Confirmar6);