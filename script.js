const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


function displayItems() {
    const itemsFromStorage = getItemLocalStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    //ARRUMAR A VALIDAÇÃO
    // Validate input
    if (newItem.value === '') {
        alert('Please add an item');
        return;
    }

    addItemToDOM(newItem);
    addItemToStorage(newItem);  
    checkUI();

    itemInput.value = '';
}

function addItemToDOM(item){
     if (item) {
        //Create list item
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(item));
    
        const button = createButton('remove-item btn-link text-red');
        li.appendChild(button);
    
        // Add li to the DOM
        itemList.appendChild(li);
     }
     
}

function addItemToStorage (item){
    if (item) {
        const itemsFromStorage = getItemLocalStorage();

        //Add new item
        itemsFromStorage.push(item);
        //Seta o novo item para o array
        localStorage.setItem('items', JSON.stringify(itemsFromStorage)); 
    }
}

function getItemLocalStorage(){
    let itemsFromStorage;

    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');

    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    }
}

function removeItem(item) {
    if (confirm('Are you sure?')) {
        //remove from dom
        item.remove();

        //Remove item localStorage
        removeItemFromStorage(item.textContent);
        checkUI();
    }
}

function removeItemFromStorage(item){
    let itemsFromStorage = getItemLocalStorage();

    // Filter out item to be removed criando um novo array
    itemsFromStorage = itemsFromStorage.filter((i) => i  !== item);

    //reset localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
    
}

function clearItems() {

    if (confirm('Are you sure clear all items?')){
        while(itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
            
        }

        // Clear from localStorage
        localStorage.removeItem('items');
        checkUI();
    }
   
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {

        const itemName = item.firstChild.textContent.toLowerCase();
        
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }

    });
}


function checkUI() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

// Initialize App
function init() {
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}

init();