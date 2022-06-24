const draggableList = document.getElementById('draggableList');
const restBtn = document.getElementById('restBtn');

const items = [
    'Home',
    'About',
    'Contact',
    'Our Service',
    'Sign In'
]

//===== store elements 📃

const listItems = [];


//===== insert elements to <ul> 📃

createListItems();

let dragStartIndex;

function createListItems() {
    [...items]
        // if you want to sort 
        .map(a => ({ item: a, sort: Math.random() }))
        .sort((a, b) => a - b)
        .map(a => a.item)
        .forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                <div draggable="true" class="draggable" data-index='${index}'>
                    <p>${item}</p>
                    <span>👌</span>
                </div>
            `;
            listItem.classList.add('list__item');
            listItems.push(listItem);
            draggableList.appendChild(listItem);
        });
    draggableList.classList.add('list__items');

    addDraggableListener();
};


function addDraggableListener() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.list__items .list__item');


    draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', dragStart)
        draggable.addEventListener('dragend', dragEnd)
    });

    dragListItems.forEach((dragListItem) => {
        dragListItem.addEventListener('dragover', dragOver);
        dragListItem.addEventListener('drop', dragDrop);
        dragListItem.addEventListener('dragenter', dragEnter);
        dragListItem.addEventListener('dragleave', dragLeave);
    })
}

//===== drop elements 📃

function dragDrop() {
    lastDragIndex = parseInt(this.closest('li').getAttribute('data-index'));
    //===== use dragStartIndex & lastDragIndex to replace drop elements 📃
    replaceItem(dragStartIndex, lastDragIndex);
    this.classList.remove('drag-over')
}


function dragStart(e) {
    //=====  store first element in dragStartIndex (LN: 20)  📃
    dragStartIndex = parseInt(this.closest('li').getAttribute('data-index'));
    this.classList.add('opacity')
}

function dragEnd() {
    this.classList.remove('opacity')
}

function dragOver(e) {
    e.preventDefault();
    this.classList.add('drag-over')
}

function dragLeave() {
    this.classList.remove('drag-over')
}

function dragEnter() {
    this.classList.add('drag-over')
}


//===== replace elements 📃
function replaceItem(firstIndex, lastIndex) {

    //===== store draggable elements & append them at index target 📃
    const itemOne = listItems[firstIndex].querySelector('.draggable');
    const itemTwo = listItems[lastIndex].querySelector('.draggable');
    listItems[firstIndex].appendChild(itemTwo);
    listItems[lastIndex].appendChild(itemOne);
}


restBtn.addEventListener('click', restItems);

function restItems() {
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach((elm) => {
        const itemIndex = parseInt(elm.getAttribute('data-index'));
        listItems[itemIndex].appendChild(elm);
    });

}