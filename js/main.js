
const bookList = [];
const cardList = [];

class Book{  
    constructor(title, author, pageCount, fave, read){
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.fave = fave;
        this.read = read;
        
        let id = this.genHexString(11);
        while(bookList.some(book => book.id === id)){
            id = this.genHexString(11);
        }
        this.id = id
    }

    genHexString(len) {
        let output = '';
        for (let i = 0; i < len; ++i) {
            output += (Math.floor(Math.random() * 16)).toString(16);
        }
        return output;
    }
}

class Card{
    constructor(card){
        this.card = card
        this.title = card.querySelector(".title-txt");
        this.author = card.querySelector(".author-txt");
        this.pageCount = card.querySelector(".page-count-txt").firstElementChild;
        this.read = card.querySelector('.read-txt').firstElementChild;
        this.isFave = card.querySelector('.isFave');
        this.favePane = card.querySelector('.card-fave');
        this.id = card.querySelector('.id-txt');

        this.delBtn = this.card.querySelector('.del-option').addEventListener('click', ()=>{
            this.removeCard();
        });
        this.confirmBtn = this.card.querySelector(".confirm-option").addEventListener('click', () => {
            this.toggleRead();
        });
        this.faveBtn = this.card.querySelector(".card-fave").addEventListener('click', () => {
            this.toggleFave();
        });  
        this.editBtn = this.card.querySelector('.edit-option').addEventListener('click', () => {
            this.editCard();
        });
    }
    
    removeCard = () =>{
        const index = cardList.findIndex(card => card.title == this.title);
        cardList.splice(index,1);
        bookList.splice(index,1);
        this.card.remove();
    }

    toggleRead = () => {
        if(this.read.innerText == "Yes"){
            this.read.innerText = "No";
        }
        else{
            this.read.innerText = "Yes";
        }
    }

    toggleFave = () => {
        
        if(this.isFave.innerText == 'true'){
            this.isFave.innerText = 'false';
            this.favePane.classList.remove('fav-color');
        }
        else{
            this.isFave.innerText = 'true';
            this.favePane.classList.add('fav-color');
        }
    }

    setCardDetails = (form) => {
        this.title.innerText = form.title.value
        this.author.innerText = form.author.value
        this.pageCount.innerText = form.pageNum.value
        if(form.read.checked){
            this.read.innerText = 'Yes'
        }
        else{
            this.read.innerText = 'No'
        }
    }

    editCard = () => {
        Popup.setPopupDetails(this.title.innerText, this.author.innerText, this.pageCount.innerText,this.id.innerText ,this.read.innerText)
        Popup.showPopup();
    }
}

const library = {
    newBook : (title, author, pageCount, fave, read) => {
        book = new Book(title,author, pageCount, fave, read)
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
            console.log(card.title.innerText)
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

const Popup = {
    
    popUpWindow : document.querySelector('.popup'),
    form : document.querySelector('form'),

    confirmBtn : document.querySelector('.confirm-btn').addEventListener('click', (e) => {
        e.preventDefault()
        const id = Popup.form.id.value
        const cardExsist = cardList.some(card => card.id.innerText == id)

        if(cardExsist){
            const cardIndex = cardList.findIndex(card => card.id.innerText == id);
            console.log(Popup.form);
            cardList[cardIndex].setCardDetails(Popup.form);
            Popup.hidePopup();
        }
        else{
            library.newBook(Popup.form.title.value, Popup.form.author.value, Popup.form.pageNum.value, false, Popup.form.read.value)
            library.displayLastBook();
            Popup.hidePopup();
        } 
    }),

    cancelBtn :  document.querySelector('.cancel-btn').addEventListener('click', (e) => {
        e.preventDefault();
        Popup.hidePopup();
        console.log(this)
    }),

    showPopup : function(){
        this.popUpWindow.classList.remove('hidden');
    },

    hidePopup : function(){
        this.popUpWindow.classList.add('hidden')
    },

    setPopupDetails : function(title, author, pageNum, id,isRead){
        this.form.title.value = title;
        this.form.author.value = author;
        this.form.pageNum.value = pageNum;
        this.form.id.value = id
        if(isRead == 'Yes'){
            this.form.read.checked = true;
        }
        else{
            this.form.read.checked = false;
        }  
    }
}

const DropDown = {

    sortTitleAzBtn : document.querySelector('#sort-title-az').addEventListener('click', () => {
        DropDown.sortTitleAz()
    }),

    sortAuthorAzBtn : document.querySelector('#sort-author-az').addEventListener('click', () => {
        DropDown.sortAuthorAz()
    }),

    sortFaveBtn : document.querySelector('#sort-fave').addEventListener('click', () => {
        DropDown.sortFave()
    }),


    sortTitleAz : () =>{
        function compare(a, b) {
            const titleA = a.title.innerText.toUpperCase();
            const titleB = b.title.innerText.toUpperCase();
          
            let comparison = 0;
            if (titleA > titleB) {
              comparison = 1;
            } else if (titleA < titleB) {
              comparison = -1;
            }
            return comparison;
        }
        cardList.sort(compare) * -1
        library.updateView()
    },

    sortAuthorAz : () =>{
        function compare(a, b) {
            // Use toUpperCase() to ignore character casing
            const authorA = a.author.innerText.toUpperCase();
            const authorB = b.author.innerText.toUpperCase();
          
            let comparison = 0;
            if (authorA > authorB) {
              comparison = 1;
            } else if (authorA < authorB) {
              comparison = -1;
            }
            return comparison;
        }
        cardList.sort(compare) * -1
        library.updateView()
    },

    sortFave : () =>{
        function compare(a, b) {
            // Use toUpperCase() to ignore character casing
            const faveA = a.isFave.innerText.toLowerCase();
            const faveB = b.isFave.innerText.toLowerCase();
          
            let comparison = 0;
            if (faveA == 'true' & faveB != 'true') {
              comparison = -1;
            } else if (faveA != 'true' & faveB == 'true') {
              comparison = 1;
            }
            return comparison;
        }
        cardList.sort(compare) 
        library.updateView()
    },
}

const addBtn = document.querySelector('.add-btn-wrapper button')
addBtn.addEventListener('click', () => {
    Popup.showPopup();
})


library.newBook('zest1', 'zuthor1', 100, true,true);

library.newBook('fest2', 'duthor1', 100, false,true);

library.newBook('yest3', 'vuthor1', 100, true,true);

library.newBook('aest4', 'ruthor1', 100, false,true);

library.displayAllBooks();




