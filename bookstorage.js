'use stict'
const mongoose = require('mongoose');
const bookSchema = require('./book');
const defaultConnectionString = 'mongodb://localhost:27017/books';

class BookStorage {
    constructor(connectionString){
        this.connectionString = connectionString || defaultConnectionString;
        mongoose.model('Book', bookSchema);
        this.BookModel =  mongoose.model('Book');
    }

    async init(){
        await mongoose.connect(this.connectionString);
    }

    async getBooks(){
    const books = await this.BookModel.find({});
    return books.map((book) => {
            return {
                'name' : book.name,
                'author' : book.author,
                'count' : book.count
            }
        });
    }

    async insertBook(book){
        const bookToInsert = Object.assign({},book);
        const bookFromDb = await this.BookModel.findOne(book);

        if(!bookFromDb){
            bookToInsert.count = 1;
            const newBook = new this.BookModel(bookToInsert);
            await newBook.save();
        }else{
            bookFromDb.count++;
            await this.BookModel.update(book, bookFromDb);
        }
    }

    async removeBook(book){
        const bookFromDb = await this.BookModel.findOne(book);
        if(!bookFromDb) //error...
            return;

        if(bookFromDb.count === 1){
            await this.BookModel.deleteOne(book);
        }else{
            bookFromDb.count--;
            await this.BookModel.update(book, bookFromDb);

        }
    }
    //for tests
    async clearCollection(){
    await this.BookModel.remove({});
}

}

module.exports = BookStorage;