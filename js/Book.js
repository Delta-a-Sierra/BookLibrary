import { bookList } from "./data.js"


export default class Book{  
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
