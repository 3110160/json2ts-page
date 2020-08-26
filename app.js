const Koa = require("koa");
const Router = require("koa-router");
const static_ = require("koa-static");
const co = require("co");
const path = require("path");
const { exec } = require("child_process");

const openBrowser = (url) => {
  switch (process.platform) {
    //mac系统使用 一下命令打开url在浏览器
    case "darwin":
      exec(`open ${url}`);
      break;
    //win系统使用 一下命令打开url在浏览器
    case "win32":
      exec(`start ${url}`);
      break;
    // 默认mac系统
    default:
      exec(`open ${url}`);
  }
};

const app = new Koa();
const router = new Router();

app.use(static_(path.join(__dirname, "./static")));

router.get("/", async (ctx, next) => {
  ctx.body = await ctx.render("index.html"); // 3. 使用
});

app.use(router.routes());
app.listen(process.env.port, () => {
  openBrowser(`http://localhost:${process.env.port}/`);
  console.log(`open in http://localhost:${process.env.port}/`)
});
