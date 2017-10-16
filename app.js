'use stict'
const port = process.env.PORT || 30000;
const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const routes = require('./routes');
const BookStorage = require('./bookstorage');

function server(port, mockBookStorage) {
    const books = mockBookStorage || new BookStorage();
    const router = routes(books);

    app.use(koaBody());

    app
        .use(router.routes())
        .use(router.allowedMethods());

    app.use(function *(){
         this.redirect('/books');
    });

    return app.listen(3000);
}

module.exports = server;
