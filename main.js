let myLibrary = [];

function Book (title, author, pageCount, fave, read){
    this.title = title,
    this.author = author,
    this.pageCount = pageCount,
    this.fave = fave,
    this.read = read,

    this.getInfo = () => {
        return `${title} by ${author}, read: ${read}, `;
    }
}

const addBookToLibrary = (title, author, pageCount, fave, read) => {
    myLibrary.push( new Book(title, author, pageCount, fave, read));
} 

const populateLibary = () => {
    myLibrary.forEach(book => {
        const card = createCard(book);
        addCard(card);
    });
}

const  createCard = book => {
    const cardTemp = document.querySelector("#card-temp");
    const card = cardTemp.content.cloneNode(true);

    const title = card.querySelector(".title-txt");
    title.innerText = book.title;

    const author = card.querySelector(".author-txt");
    author.innerText = book.author;

    const pageCount = card.querySelector(".page-count-txt").firstElementChild;
    pageCount.innerText = book.pageCount;

    const read = card.querySelector('.read-txt').firstElementChild;
    read.innerText = "No";
    
    if(book.read){
        read.innerText = "Yes";
    }
    const faveBar = card.querySelector('.card-fave');
    if(book.fave){
        faveBar.classList.add("fav-color");
    }
    return card;
}  

const addCard = card =>{
    const cardHolder = document.querySelector('.card-container');
    cardHolder.appendChild(card);
}

const removeCard = button => {
    const card = button.parentNode.parentNode;
    const title = card.querySelector(".title-txt");
    const cardNum = myLibrary.findIndex(book => book.title == title.innerText);
    myLibrary.splice(cardNum,1);
    card.remove();
}

const toggleRead = button => {
    const card = button.parentNode.parentNode;
    const title = card.querySelector(".title-txt");
    const readTxt = card.querySelector('.read-txt').firstElementChild;
    myLibrary.forEach(book => {
        if(book.title == title.innerText){
            if(book.read){
                book.read = false;
                readTxt.innerText = "No";
            }
            else{
                book.read = true;
                readTxt.innerText = "Yes";
            }
        }
    });
}

const toggleFave = button => {
    const card = button.parentNode;
    const title = card.querySelector(".title-txt");
    const favePane = card.querySelector('.card-fave');

    myLibrary.forEach(book => {
        if(book.title == title.innerText){
            if(book.fave){
                book.fave = false;
                favePane.classList.remove('fav-color');
            }
            else{
                book.fave = true;
                favePane.classList.add('fav-color');
            }
        }
    });
}

addBookToLibrary('Test1', 'Author1', 100, true,true);
addBookToLibrary('Test2', 'Author2', 200, false, false);
addBookToLibrary('Test3', 'Author3', 300, true, true);
addBookToLibrary('Test4', 'Author4', 100, false, true);
addBookToLibrary('Test5', 'Author5', 200, false, false);
addBookToLibrary('Test6', 'Author6', 300, false, true);
addBookToLibrary('Test7', 'Author7', 100, false, true);

populateLibary();

const delBtns = document.querySelectorAll('.del-option');
delBtns.forEach(button =>{
    button.addEventListener('click', () =>{
        removeCard(button);
    });
});

const confirmBtns = document.querySelectorAll(".confirm-option");
confirmBtns.forEach(button => {
    button.addEventListener('click', () => {
        toggleRead(button);
    });
});

const faveBtns = document.querySelectorAll(".card-fave");
faveBtns.forEach(button => {
    button.addEventListener('click', () => {
        toggleFave(button);
    });
});