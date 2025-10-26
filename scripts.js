// Seleções dos elementos HTML editáveis e wrappers por ID
const elements = {
	title: document.getElementById('prompt-title'),
	content: document.getElementById('prompt-content'),
	titleWrapper: document.getElementById('title-wrapper'),
	contentWrapper: document.getElementById('content-wrapper'),
	btnOpen: document.getElementById('btn-open'),
	btnClose: document.getElementById('btn-close'),
	sidebar: document.querySelector('.sidebar')
};

// Verifica se o elemento contenteditable está vazio e adiciona/remove a classe 'is-empty' no wrapper
function updateEditableWrapperState(element, wrapper) {
	// Normaliza o texto e considera vazio quando não existir texto legível
	const text = element.textContent.replace(/\uFEFF/g, '').trim();
	const isEmpty = text === '';

	wrapper.classList.toggle('is-empty', isEmpty);

}

// Atualiza todos os estados editáveis gerenciados
function updateAllEditableStates() {
	updateEditableWrapperState(elements.title, elements.titleWrapper);
	updateEditableWrapperState(elements.content, elements.contentWrapper);
}

// Anexa ouvintes de evento 'input' para atualizar os wrappers em tempo real
function attachAllEditableHandlers() {
	elements.title.addEventListener('input', () => {
		updateEditableWrapperState(elements.title, elements.titleWrapper);
	});


	elements.content.addEventListener('input', () => {
		updateEditableWrapperState(elements.content, elements.contentWrapper);
	});

}

// Anexa ouvintes para abrir/fechar a sidebar usando apenas JavaScript
function attachSidebarHandlers() {
	if (elements.btnClose) {
		elements.btnClose.addEventListener('click', () => {
			closeSidebar();
		});
	}

	if (elements.btnOpen) {
		elements.btnOpen.addEventListener('click', () => {
			openSidebar();
		});
	}

	// Se preferir, inicializa o estado baseado no estilo atual (não altera CSS externo)
	// Mantemos a sidebar visível por padrão; se estiver inline 'none', mantemos escondida.
}

function openSidebar() {
	// Remove inline display:none para restaurar o comportamento padrão do CSS
	elements.sidebar.style.display = 'flex';
	elements.btnOpen.style.display = 'none';
	// Atualiza atributos de acessibilidade
}

function closeSidebar() {
	// Esconde a sidebar usando inline style (não modificamos o CSS do projeto)
	elements.sidebar.style.display = 'none';
	elements.btnOpen.style.display = 'block';
	// Atualiza atributos de acessibilidade
}

// Inicialização: anexa handlers e atualiza o estado inicial
function init() {
	attachAllEditableHandlers();
	updateAllEditableStates();
	attachSidebarHandlers();
}

// Garante inicialização quando o DOM estiver pronto
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}

