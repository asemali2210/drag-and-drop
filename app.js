const draggableList = document.getElementById('draggableList');
const restBtn = document.getElementById('restBtn');
const itemsLabel = Array.from(document.querySelectorAll('.list__item .draggable .input__label'));
const draggables = document.querySelectorAll('.draggable');

let items = [];

//===== store lable inner text 📃

itemsLabel.forEach((label) => {
    items.push(label.innerHTML)
});

//===== store elements 📃

const listItems = Array.from(document.querySelectorAll(".list__item"));

//===== insert data to elements 📃

setListItemsData();

let dragStartIndex;

function setListItemsData() {
    [...listItems]
        // if you want to sort 
        .map(a => ({ item: a, sort: Math.random() }))
        .sort((a, b) => a - b)
        .map(a => a.item)
        .forEach((item, index) => {
            itemsLabel[index].innerHTML += ` 👉 ${index}`;
            item.querySelector('.draggable input').setAttribute('value', index)
            item.querySelector('.draggable').setAttribute('data-reset', index)
            item.setAttribute('data-index', index);
        });
    draggableList.classList.add('list__items');
    addDraggableListener();
};



function addDraggableListener() {
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
    this.classList.remove('drag-over');
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
    const inputItemOne = listItems[firstIndex].querySelector('.draggable input');
    const inputItemTwo = listItems[lastIndex].querySelector('.draggable input');
    const spanItemOne = listItems[firstIndex].querySelector('.draggable .now');
    const spanItemTwo = listItems[lastIndex].querySelector('.draggable .now');

    //===== set value draggable elements 📃

    itemOne.setAttribute('data-index', lastIndex);
    itemTwo.setAttribute('data-index', firstIndex);

    //===== value in draggable | Maybe we don't need it 📃

    itemOne.setAttribute('value', lastIndex);
    itemTwo.setAttribute('value', firstIndex);

    //===== set value to inputs 📃

    inputItemOne.setAttribute('value', lastIndex);
    inputItemTwo.setAttribute('value', firstIndex);

    //===== notice value 📃

    spanItemOne.innerHTML = `Now, Value is ${lastIndex}`;
    spanItemTwo.innerHTML = `Now, Value is ${firstIndex}`;

    //===== swipe  📃

    listItems[firstIndex].appendChild(itemTwo);
    listItems[lastIndex].appendChild(itemOne);

    //===== display effects 📃

    setTimeout(() => {
        spanItemOne.classList.add('show');
        spanItemTwo.classList.add('show');
    }, 500);

    setTimeout(() => {
        spanItemOne.classList.remove('show');
        spanItemTwo.classList.remove('show');
    }, 3000);

}


restBtn.addEventListener('click', restItems);

function restItems() {
    draggables.forEach((elm) => {
        const itemIndex = parseInt(elm.getAttribute('data-reset'));
        listItems[itemIndex].appendChild(elm);
        console.log(elm)
    });

}
