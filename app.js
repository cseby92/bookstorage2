'use stict'
const port = process.env.PORT || 30000;
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const koaBody = require('koa-body');
const BookStorage = require('./bookstorage');

function server(port, mockBookStorage) {
    const books = mockBookStorage || new BookStorage();
    const router = new Router();

    try{
        initBooks();
    }catch(ex) {
        console.log(ex);
    }

    app.use(koaBody());


    async function initBooks() {
        await books.init();
    }
    router
        .get('/books',async (ctx) => {
        try{
            ctx.body = await books.getBooks();
        }catch(ex) {
            console.log(ex);
        }
    })
    .post('/books', async(ctx) => {
        try{
            await books.insertBook(ctx.request.body);
            ctx.body = await books.getBooks();
        }catch(ex){
            console.log(ex);
        }
    })
    .delete('/books', async(ctx) => {
        book = {
            'name': ctx.query.name,
            'author': ctx.query.author
        }
        try{
            await books.removeBook(book);
            ctx.body = await books.getBooks();
        }catch(ex){
            console.log(ex);
        }
    });

    app
        .use(router.routes())
        .use(router.allowedMethods());

    return app.listen(3000);
}

module.exports = server;
