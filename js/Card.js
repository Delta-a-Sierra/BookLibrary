import { bookList } from "./data.js"
import { cardList } from "./data.js"
import { Popup } from "./Aside.js"

export default class Card{
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
