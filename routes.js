'use strict';
const Router = require('koa-router');
const router = new Router();

module.exports = function(storage){

    //todo errors!
    try{
        initBooks();
    }catch(ex) {
        console.log(ex);
    }

    async function initBooks() {
        await storage.init();
    }

    router
        .get('/books',async (ctx) => {
            try{
                ctx.body = await storage.getBooks();
            }catch(ex) {
                console.log(ex);
            }
        })
        .get('/books/:name',async (ctx) => {
            try{
                const nameFromUrl = ctx.params.name.split('%20');
                let name;
                if(nameFromUrl.length > 1)
                    name = nameFromUrl.concat(' ');
                else
                    name = nameFromUrl[0];

                ctx.body = await storage.findBooks(name);
            }catch(ex) {
                console.log(ex);
            }
        })
        .post('/books', async(ctx) => {
            try{
                await storage.insertBook(ctx.request.body);
                ctx.body = await storage.getBooks();
            }catch(ex){
                console.log(ex);
            }
        })
        .delete('/books', async(ctx) => {
            const book = {
                'name': ctx.query.name,
                'author': ctx.query.author
            }
            try{
                await storage.removeBook(book);
                ctx.body = await storage.getBooks();
            }catch(ex){
                console.log(ex);
            }
        })

    return router;
}