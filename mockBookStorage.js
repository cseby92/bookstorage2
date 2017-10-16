'use strict'
const _ = require('lodash');

class MockBookStorage {

    constructor(connectionString){
        this.books = [];
    }

    init(){}

    getBooks() {
        return this.books;
    }

    findBooks(bookName){

    }

    insertBook(book) {
        const bookToInsert = Object.assign({},book)
        const bookFromArray =_.find(this.books, book )
        if(!bookFromArray) {
            bookToInsert.count = 1;
            this.books.push(bookToInsert);
        }else {
            const index = _.indexOf(this.books, bookFromArray);
            this.books[index].count++;
        }
    }

    removeBook(book) {
        const bookFromArray =_.find(this.books, book );
        if(!bookFromArray)
            return;
        if(bookFromArray.count === 1){
            _.remove(this.books, function (book) {
                if(book.name === bookFromArray.name && book.author === bookFromArray.author)
                    return true;
                return false;
            })
        }else{
            const index = _.indexOf(this.books, bookFromArray);
            this.books[index].count--;
        }
    }
}
module.exports = MockBookStorage;