function definirEspecialidade() {
    const radios = document.getElementsByName('especialidade');
    let especialidadeSelecionada = '';

    for (const radio of radios) {
        if (radio.checked) {
            especialidadeSelecionada = radio.value;
            break;
        }
    }

    return especialidadeSelecionada;
}

function ConfirmarEspe() {
    const especialidadeSelecionada = definirEspecialidade();

    if (especialidadeSelecionada === '') {
        console.error('Por favor, selecione uma especialidade.');
        alert('Por favor, selecione uma especialidade.'); 
        return; 
    }

    console.log(`Especialidade selecionada: ${especialidadeSelecionada}`); 

    localStorage.setItem('especialidadeSelecionada', especialidadeSelecionada);
    window.location.href = "/sintomas1"; 
}
