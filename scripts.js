// Chave para identificar os dados salvos pela nossa aplicação no browser.
const STORAGE_KEY = 'prompts_storage';

// Estado para carregar os prompts salvos e exibir.
const state = {
	prompts: [],
	selectedId: null
}

// Seleções dos elementos HTML editáveis e wrappers por ID
const elements = {
	title: document.getElementById('prompt-title'),
	content: document.getElementById('prompt-content'),
	titleWrapper: document.getElementById('title-wrapper'),
	contentWrapper: document.getElementById('content-wrapper'),
	btnOpen: document.getElementById('btn-open'),
	btnClose: document.getElementById('btn-close'),
	sidebar: document.querySelector('.sidebar'),
	btnSave: document.getElementById('btn-save'),
	list: document.getElementById('prompt-list'),
	search: document.getElementById('search-input'),
	btnNewPrompt: document.getElementById('btn-new-prompt'),
	btnCopy: document.getElementById('btn-copy')
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

function save() {
	const title = elements.title.innerHTML.trim();
	const content = elements.content.innerHTML.trim();


	if (title === '' || content === '') {
		alert('Por favor, preencha pelo menos o título ou o conteúdo do prompt antes de salvar.');
		return;
	}

	console.log(state.selectedId);
	if (state.selectedId) {
		// Atualiza prompt existente
		const existingPrompt = state.prompts.find((p) => p.id === state.selectedId);
		if (existingPrompt) {
			existingPrompt.title = title || 'Sem título';
			existingPrompt.content = content || 'Sem conteúdo';
		}

	} else {
		// Cria novo prompt
		const newPrompt = {
			id: Date.now().toString(36),
			title: title,
			content: content
		};
		state.prompts.unshift(newPrompt);
		state.selectedId = newPrompt.id;
	}

	renderList(elements.search.value);
	persist();
	alert('Prompt salvo com sucesso!!!');
};

function persist() {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state.prompts));
	} catch (error) {
		console.error('Erro ao salvar no localStorage:', error);
	}
};

function load() {
	try {
		const storage = localStorage.getItem(STORAGE_KEY);
		state.prompts = storage ? JSON.parse(storage) : [];
		state.selectedId = null;

		console.log('Prompts carregados:', state.prompts);

	} catch (error) {
		console.error('Erro ao carregar do localStorage:', error);
	}
}

function createPromptItem(prompt) {
	return ` 
			<li class="prompt-item" data-id="${prompt.id}" data-action="select">
		<div class="prompt-item-left">
			<span class="prompt-item-title">${prompt.title}</span>
			<span class="prompt-item-description">${prompt.content}</span> 
		</div>
		<button class="btn-icon" aria-label="Remover prompt" data-action="remove">
			<img src="assets/remove.svg" alt="Remover" class="icon icon-transh">
		</button>
	</li>
	`
}

function renderList(filterText = "") {
	const filteredPrompts = state.prompts.filter((prompt) =>
		prompt.title.toLowerCase().includes(filterText.toLowerCase().trim())
	).map((p) => createPromptItem(p)).join("");

	elements.list.innerHTML = filteredPrompts;
}

function addNewPrompt() {
	state.selectedId = null;
	elements.title.textContent = "";
	elements.content.textContent = "";
	updateAllEditableStates();
	elements.title.focus();
};

function copySelected() {
	try {
		const content = elements.content.textContent.trim();

		if(!navigator.clipboard){
			console.error('Clipboard API não suportada neste ambiente.');
		}
		return navigator.clipboard.writeText(content);
		
	} catch (error) {
		console.error('Erro ao copiar para a área de transferência:', error);
	}
}

// Eventos 
elements.btnSave.addEventListener('click', save);
elements.search.addEventListener('input', (event) => {
	renderList(event.target.value);
})
elements.list.addEventListener('click', (event) => {
	const removeBtn = event.target.closest('[data-action="remove"]');
	const item = event.target.closest('[data-id]');

	if (!item) return

	const id = item.getAttribute("data-id");
	state.selectedId = id;

	if (removeBtn) {
		// Remover prompt
		state.prompts = state.prompts.filter((p) => p.id !== id);
		renderList(elements.search.value);
		addNewPrompt();
		persist();
		return;
	}

	if (event.target.closest('[data-action="select"]')) {
		const prompt = state.prompts.find((p) => p.id === id);

		if (prompt) {
			elements.title.textContent = prompt.title;
			elements.content.textContent = prompt.content;
			updateAllEditableStates();
		}
	}
});
elements.btnNewPrompt.addEventListener('click', addNewPrompt);
elements.btnCopy.addEventListener('click', copySelected);

// Inicialização: anexa handlers e atualiza o estado inicial
function init() {
	load();
	renderList("");
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