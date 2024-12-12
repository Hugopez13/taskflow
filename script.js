const btnAdicionarTarefa = document.querySelector('.btn-add-task');
const formAdicionarTarefa = document.querySelector('.form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const btnLimparTarefas = document.querySelector('.btn-clear-tasks');

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function editarTarefa(tarefa, paragrafo) {
    const novaDescricao = prompt("Qual é o novo nome da Tarefa?", tarefa.descricao);

    if (novaDescricao === null) {
        return;
    }

    if (novaDescricao.trim() === '') {
        console.warn('Descrição inválida. A tarefa não foi atualizada.');
        return;
    }

    tarefa.descricao = novaDescricao;
    paragrafo.textContent = novaDescricao;

    atualizarTarefas();
    alert('A tarefa foi atualizada com sucesso!');
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `;

    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');

    if (tarefa.completa) {
        paragrafo.classList.add('completed');
        svg.querySelector('circle').setAttribute('fill', '#4CAF50');
    }

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');
    botao.textContent = "Editar";
    botao.onclick = () => editarTarefa(tarefa, paragrafo);

    li.onclick = () => {
        tarefa.completa = !tarefa.completa;
        atualizarTarefas();
        renderizarTarefas();
    };

    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    return li;
}

function renderizarTarefas() {
    ulTarefas.innerHTML = '';
    tarefas.forEach(tarefa => {
        const elementoTarefa = criarElementoTarefa(tarefa);
        ulTarefas.append(elementoTarefa);
    });
}


btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
});

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const tarefa = {
        descricao: textarea.value,
        completa: false
    };

    tarefas.push(tarefa);
    renderizarTarefas();
    atualizarTarefas();
    textarea.value = '';
    formAdicionarTarefa.classList.add('hidden');
});

btnLimparTarefas.addEventListener('click', () => {
    if (confirm("Você tem certeza que deseja limpar todas as tarefas?")) {
        tarefas.length = 0;
        atualizarTarefas();
        renderizarTarefas();
    }
});