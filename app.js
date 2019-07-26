const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");

const index = require("./routes/index");
const users = require("./routes/users");
const JwtUtil = require("./middlewares/jwt");
// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(async (ctx, next) => {
  let { url = "" } = ctx;
  if (url.indexOf("/login") == -1) {
    //需要校验登录态
    let header = ctx.request.header;
    let { token } = header;
    if (token) {
      let jwt = new JwtUtil(token);
      let result = jwt.verifyToken();
      if (result == "err") {
        ctx.body = { success: false, message: "登录已过期,请重新登录" };
      } else {
        await next();
      }
    } else {
      ctx.body = { success: 403, message: "登录已过期,请重新登录" };
    }
  } else {
    await next();
  }
});
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
