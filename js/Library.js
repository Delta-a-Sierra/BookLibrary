import Book from "./Book.js"
import Card from "./Card.js"
import { bookList } from "./data.js"
import { cardList } from "./data.js"

const library = {
    newBook : (title, author, pageCount, fave, read) => {
        const book = new Book(title,author, pageCount, fave, read)
        bookList.push(book)
    },

    displayAllBooks : () => {
        bookList.forEach(book => {
            const cardHolder = document.querySelector('.card-container');
            cardHolder.appendChild(library.createNode(book));
        });

        const cards = document.querySelectorAll('.card')
        cards.forEach(card => cardList.push(new Card(card)))
    },

    displayLastBook : () => {
        const last = bookList.length - 1
        const book = bookList[last]
        const cardHolder = document.querySelector('.card-container');
        cardHolder.appendChild(library.createNode(book));

        
        const cards = document.querySelectorAll('.card')
        const card = cards[last]
        cardList.push(new Card(card))
    },

    updateView : () => {
        const cardHolder = document.querySelector('.card-container');
        cardList.forEach(card => {
            card.card.remove()
            cardHolder.appendChild(card.card);
        });

    },


    createNode(book) {
        const cardTemp = document.querySelector("#card-temp");
        const card = cardTemp.content.cloneNode(true);
    
        const title = card.querySelector(".title-txt");
        title.innerText = book.title;

        const id = card.querySelector(".id-txt");
        id.innerText = book.id
    
        const author = card.querySelector(".author-txt");
        author.innerText = book.author;
    
        const pageCount = card.querySelector(".page-count-txt").firstElementChild;
        pageCount.innerText = book.pageCount;
    
        const read = card.querySelector('.read-txt').firstElementChild;
        read.innerText = "No";
        if(book.read){
            read.innerText = "Yes";
        }

        const faveTxt = card.querySelector('.isFave');
        const faveBar = card.querySelector('.card-fave');
        faveTxt.innerText = 'false'
        if(book.fave){
            faveTxt.innerText = 'true'
            faveBar.classList.add("fav-color");
        }
        book.card = card;
        return card;
    } 

}

export default library