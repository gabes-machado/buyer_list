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
    const
}