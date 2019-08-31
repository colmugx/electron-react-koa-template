import Koa from 'koa'

const app = new Koa()

app.use(ctx => {
  ctx.body = {
    code: 0,
    message: 'koa linked.'
  }
})

app.listen(9080);
