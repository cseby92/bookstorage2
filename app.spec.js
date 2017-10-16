'use stict'
const app = require('./app');
const MockBookStorage = require('./mockBookStorage');
const request = require('supertest').agent(app(3000, new MockBookStorage()));
const expect = require('chai').expect;


//TODO modify IT statements

describe('app', function() {

    describe('/books GET', function () {
        it('should return an empty array of books', function(done) {
            request
                .get('/books')
                .expect(200)
                .end(done);
          });
    });

    describe('/books POST', function () {
        it('should return add a book to the array of books', function(done) {
            const reqBody = {'name' : 'Harry Potter', 'author' : 'JK Rowling'};
            request
                .post('/books')
                .send(reqBody)
                .expect(200)
                .end(done);

        });
    });

    describe('/books POST', function () {
        it('should return add a book to the array of books', function(done) {
            const reqBody = {'name' : 'Harry Potter', 'author' : 'JK Rowling'};
            request
                .post('/books')
                .send(reqBody)
                .expect(200)
                .end(done);
        });
    });

    describe('/books DELETE', function () {
        it('should return a book', function(done) {
            const book = {
                'name': 'Harry Potter',
                'author': 'JK Rowling'
            };
            const reqBody = {'name' : 'Harry Potter', 'author' : 'JK Rowling'};
            request
                .delete('/books')
                .query(book)
                .expect(200)
                .end(done);


        });
    });
});