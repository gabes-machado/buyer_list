// Definindo as interfaces
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Selecionando elementos do DOM
var formItem = document.getElementById('formItem');
var listItems = document.getElementById('listItems');
var inputItem = document.getElementById('item');
// Carregando itens do localStorage
var loadItems = function () {
    var items = localStorage.getItem('items');
    return items ? JSON.parse(items) : [];
};
// Salvando itens no localStorage
var saveItems = function (items) {
    localStorage.setItem('items', JSON.stringify(items));
};
// Adicionando um novo item
var addItem = function (name) {
    var items = loadItems();
    var newItem = {
        id: new Date().toISOString(),
        name: name
    };
    items.push(newItem);
    saveItems(items);
};
// Removendo um item pelo ID
var removeItem = function (id) {
    var items = loadItems();
    var filteredItems = items.filter(function (item) { return item.id !== id; });
    saveItems(filteredItems);
};
// Editando um item pelo ID
var editItem = function (id, name) {
    var items = loadItems();
    var updatedItems = items.map(function (item) { return item.id === id ? __assign(__assign({}, item), { name: name }) : item; });
    saveItems(updatedItems);
};
// Renderizando os itens na tela
var renderItems = function () {
    var items = loadItems();
    listItems.innerHTML = '';
    items.forEach(function (item) {
        var listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = item.name;
        listItems.appendChild(listItem);
        // Adicionando eventos para editar e remover o item
        listItem.addEventListener('dblclick', function () {
            var newName = prompt('Editar Item:', item.name);
            if (newName !== null)
                editItem(item.id, newName);
            renderItems();
        });
    });
};
// Inicializando a aplicação
formItem.addEventListener('submit', function (event) {
    event.preventDefault();
    var name = inputItem.value.trim();
    if (name !== '') {
        addItem(name);
        inputItem.value = '';
        renderItems();
    }
});
// Renderizando itens ao carregar a página
renderItems();
