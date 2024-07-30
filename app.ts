// Definindo as interfaces

interface Item {
    id: string;
    name: string;
}

// Selecionando elementos do DOM
const formItem = document.getElementById('formItem') as HTMLFormElement;
const listItems = document.getElementById('listItems') as HTMLUListElement;
const inputItem = document.getElementById('item') as HTMLInputElement;

// Carregando itens do localStorage
const loadItems = (): Item[] => {
    const items = localStorage.getItem('items');
    return items ? JSON.parse(items) : [];
};

// Salvando itens no localStorage
const saveItems = (items: Item[]): void => {
    localStorage.setItem('items', JSON.stringify(items));
};

// Adicionando um novo item
const addItem = (name: string) => {
    const items = loadItems();
    const newItem: Item = {
        id: new Date().toISOString(),
        name
    };
    items.push(newItem);
    saveItems(items);
};

// Removendo um item pelo ID
const removeItem = (id: string) => {
    const items = loadItems();
    const filteredItems = items.filter(item => item.id !== id);
    saveItems(filteredItems);
};

// Editando um item pelo ID
const editItem = (id: string, name: string) => {
    const items = loadItems();
    const updatedItems = items.map(item => item.id === id ? { ...item, name } : item);
    saveItems(updatedItems);
};

// Renderizando os itens na tela
const renderItems = () => {
    const items = loadItems();
    listItems.innerHTML = '';
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = item.name;
        listItems.appendChild(listItem);
    
        // Adicionando eventos para editar e remover o item
        listItem.addEventListener('dblclick', () => {
            const newName = prompt('Editar Item:', item.name);
            if (newName !== null) editItem(item.id, newName);
            renderItems();
        });
    });
};

// Inicializando a aplicação
formItem.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = inputItem.value.trim();
    if (name !== '') {
        addItem(name);
        inputItem.value = '';
        renderItems();
    }
}); 

// Renderizando itens ao carregar a página
renderItems();
