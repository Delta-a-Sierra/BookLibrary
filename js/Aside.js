

import { cardList } from "./data.js"
import library from "./Library.js"

export const Popup = {
    
    popUpWindow : document.querySelector('.popup'),
    form : document.querySelector('form'),

    confirmBtn : document.querySelector('.confirm-btn').addEventListener('click', (e) => {
        e.preventDefault()
        const id = Popup.form.id.value
        const cardExsist = cardList.some(card => card.id.innerText == id)

        if(cardExsist){
            const cardIndex = cardList.findIndex(card => card.id.innerText == id);
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

export const DropDown = {

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