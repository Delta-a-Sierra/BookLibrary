let myLibrary = [];


function Book (title, author, pageCount, read){
    this.title = title,
    this.author = author,
    this.pageCount = pageCount,
    this.read = read,

    this.getInfo = () => {
        return `${title} by ${author}, read: ${read}, `
    }
}

function addBookToLibrary(title, author, pageCount, read) {
    myLibrary.push( new Book(title, author, pageCount, read));
}


