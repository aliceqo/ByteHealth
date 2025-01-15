function adicionarDoenca(event) {
    const doencaQuadro = event.target.closest('.doenca-quadro');

    const tratamento = doencaQuadro.querySelector('input[name="tratamento"]').value;
    const remedio = doencaQuadro.querySelector('input[name="remedio"]').value;

    const resumo = tratamento.split(" ")[0] + " - " + remedio.split(" ")[0];

    doencaQuadro.innerHTML = `
        <p>${resumo}</p>
        <button class="resumo-editar-btn" onclick="editarDoenca(event)">Editar</button>
        <button class="resumo-excluir-btn" onclick="excluirDoenca(event)">Excluir</button>
    `;

    doencaQuadro.classList.add('resumido');

    resumirOutrosQuadros(doencaQuadro);
}

function excluirDoenca(event) {
    const doencaQuadro = event.target.closest('.doenca-quadro');
    doencaQuadro.remove(); 
}

function adicionarNovoQuadro() {
    const container = document.getElementById('doenca-quadro-container');

    const novoQuadro = document.createElement('div');
    novoQuadro.classList.add('doenca-quadro');
    novoQuadro.innerHTML = `
        <div class="input_box">
            <input type="text" autocomplete="off" name="tratamento" placeholder="Tratamento" required>
            <input type="text" autocomplete="off" name="remedio" placeholder="Remédio" required>
        </div>
        <button class="adicionar-btn" onclick="adicionarDoenca(event)">Adicionar</button>
    `;

    container.appendChild(novoQuadro);

    resumirOutrosQuadros(novoQuadro);
}

function editarDoenca(event) {
    const doencaQuadro = event.target.closest('.doenca-quadro');

    doencaQuadro.classList.remove('resumido');

    doencaQuadro.innerHTML = `
        <div class="input_box">
            <input type="text" autocomplete="off" name="tratamento" placeholder="Tratamento" required>
            <input type="text" autocomplete="off" name="remedio" placeholder="Remédio" required>
        </div>
        <button class="editar-btn" onclick="editarDoenca(event)">Editar</button>
    `;
}

function resumirOutrosQuadros(currentQuadro) {
    const quadros = document.querySelectorAll('.doenca-quadro');

    quadros.forEach((quadro) => {
        if (quadro !== currentQuadro) {
            const tratamentoInput = quadro.querySelector('input[name="tratamento"]');
            const remedioInput = quadro.querySelector('input[name="remedio"]');

            if (tratamentoInput && remedioInput) {
                const tratamento = tratamentoInput.value || "Sem tratamento";
                const remedio = remedioInput.value || "Sem remédio";

                const resumo = tratamento.split(" ")[0] + " - " + remedio.split(" ")[0];
                quadro.innerHTML = `
                    <p>${resumo}</p>
                    <button class="resumo-editar-btn" onclick="editarDoenca(event)">Editar</button>
                    <button class="resumo-excluir-btn" onclick="excluirDoenca(event)">Excluir</button>
                `;

                quadro.classList.add('resumido');
            }
        }
    });
}

document.querySelectorAll('.doenca-quadro').forEach((quadro) => {
    const adicionarBtn = quadro.querySelector('.adicionar-btn');
    if (adicionarBtn) {
        adicionarBtn.addEventListener('click', adicionarDoenca);
    }
});
