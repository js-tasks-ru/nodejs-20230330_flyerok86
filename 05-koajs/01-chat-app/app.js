const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

let subscribers = [];

router.get('/subscribe', async (ctx, next) => {
    ctx.body = await new Promise(resolve=>subscribers.push(resolve));
});

router.post('/publish', async (ctx, next) => {
    if(!ctx.request.body.message) {
        ctx.status = 204;
        return;
    }

    subscribers.forEach(resolve => {
        resolve(ctx.request.body?.message)
    });
    subscribers = []
    ctx.status = 201;
});

app.use(router.routes());

module.exports = app;
