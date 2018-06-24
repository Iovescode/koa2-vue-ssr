const Koa = require('koa');
const Router = require('koa-router');
const path = require('path')
const app = new Koa();
const router = new Router();
const views = require('koa-views')
const static = require('koa-static')

const koa2Req = require('koa2-request');
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

app.use(static(
    path.join(__dirname, './static')
))

router.get('/', async function (ctx, next) {
    let title = 'hello koa2'
    await ctx.render('index',{
        title
    })
});

router.get('/one', async function (ctx, next) {
    var res =await koa2Req('https://www.apiopen.top/femaleNameApi?page=1', ) ;
    var title=res.body;
    await ctx.render('index',{
        title
    })
});


router.get('/getdata', async function (ctx, next) {
    var res =await koa2Req('https://www.apiopen.top/femaleNameApi', ctx.query) ;
    ctx.body=res.body
});



app.use(router.routes())
app.listen(8089, () => {
    console.log('starting at port 8089');
});