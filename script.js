const booksReadDOM = document.querySelector('.books-read');
const booksToReadDOM = document.querySelector('.books-to-read');
const booksTotalDOM = document.querySelector('.books-total');
const addNewBookBtn = document.querySelector('.add-new-book');
const dialogDOM = document.querySelector('.dialog');
const submitBtn = document.querySelector('.submit-btn');
const titleDOM = document.querySelector('#title');
const authorDOM = document.querySelector('#author');
const pagesDOM = document.querySelector('#pages');
const statusDOM = document.querySelector('#status');
const mainDOM = document.querySelector('.main');


function getLibary(){
    if (getDatas() === null){
        let myLibrary = [
            {
                title: "Rich Dad Poor Dad",
                author: "Robert Kiyosaki",
                pages: 352,
                status: "off",
            },
            {
                title: "The 5am club",
                author: "Robin Sharma",
                pages: 241,
                status: "on",
            },
            {
                title: "Make Your Bed",
                author: "William H. McRaven",
                pages: 312,
                status: "on",
            }
        ];
        setData(myLibrary);
    }
    else if(getDatas() !== null){
        let myLibrary = getDatas();
        return myLibrary;
    }
}

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    if (status.checked) {
        this.status = "on";
    }
    else {
        this.status = "off"
    }

}

function addBookToLibrary(e) {
    e.preventDefault();
    let myLibrary = getDatas();
    if (titleDOM.value === "" || authorDOM.value === "" || pagesDOM.value === "") return;
    else {
        myLibrary.push(new Book(titleDOM.value, authorDOM.value, pagesDOM.value, statusDOM));
        setData(myLibrary);

        titleDOM.value = "";
        authorDOM.value = "";
        pagesDOM.value = "";
        statusDOM.value = "off"

        dialogDOM.close();
    }
}

function fillUpMain(array) {
    mainDOM.innerHTML = "";

    array.forEach((book, idx) => {
        let cardDOM = document.createElement('div');
        cardDOM.classList.add('card');
        cardDOM.id = idx;

        let title = document.createElement('div');
        title.classList.add('card-title');
        title.innerHTML = "Title:";
        let titleP = document.createElement('p');
        titleP.innerHTML = book.title;
        title.append(titleP);

        let author = document.createElement('div');
        author.classList.add('card-title');
        author.innerHTML = "Author:"
        let authorP = document.createElement('p');
        authorP.innerHTML = book.author;
        author.append(authorP);

        let pages = document.createElement('div');
        pages.classList.add('card-title');
        pages.innerHTML = "Pages:";
        let pagesP = document.createElement('p');
        pagesP.innerHTML = book.pages;
        pages.append(pagesP);

        let status = document.createElement('div');
        if (book.status === "on") {
            status.classList.add("status", "read");
        }
        else {
            status.classList.add("status");
        }
        status.addEventListener('click', () => {
            status.classList.toggle("read")
            fillUpHeader()
        })
        let icon = document.createElement('i');
        icon.classList.add("fa", "fa-eye")
        status.append(icon);

        let delBtn = document.createElement('i');
        delBtn.classList.add("fa", "fa-trash");
        delBtn.addEventListener('click', (e) => {
            let myLibrary = getDatas();
            newArray = myLibrary.filter((book) => book != myLibrary[idx]);
            setData(newArray)
            fillUpMain(getDatas())
        })

        cardDOM.append(title, author, pages, status, delBtn);
        mainDOM.append(cardDOM);
    })
    fillUpHeader();
}

function fillUpHeader() {
    booksTotalDOM.innerHTML = getDatas().length

    let readBooks = 0;
    let booksStatus = document.querySelectorAll('.status');
    booksStatus.forEach(bookstat => {
        if (bookstat.classList.value === "status read") readBooks++;
    })
    booksReadDOM.innerHTML = readBooks;
    booksToReadDOM.innerHTML = getDatas().length - readBooks
}

addNewBookBtn.addEventListener('click', () => {
    dialogDOM.showModal();
})

submitBtn.addEventListener('click', (e) => {
    addBookToLibrary(e)
    fillUpMain(getDatas());
})

fillUpMain(getLibary());

function getDatas(){
    return JSON.parse(localStorage.getItem('libary'))
 }
 
function setData(data){
     localStorage.setItem('libary', JSON.stringify(data))
 }
 
function clearDatas(){
     localStorage.clear();
 }



