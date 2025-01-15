const senha = localStorage.getItem('senha');
const tipo = localStorage.getItem('tipo');

document.getElementById('senhaDisplay').innerText = `${senha}`;
document.getElementById('tipoSenha').innerText = tipo;