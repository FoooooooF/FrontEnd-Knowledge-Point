const express = require("express");
const session = require("express-session");
const app = express();
app.use(
  session({
    resave: true, // 是否每次重新存储session
    saveUninitialized: true,
    secret: "zf"
  })
);
app.get("/", function(req, res) {
  res.end("pk");
});
app.get("/visit", (req, res, next) => {
  if (!req.session.visit) {
    req.session.visit = 1;
  } else {
    req.session.visit++;
  }
  res.send("当前你是 第" + req.session.visit + "次访问");
});
app.listen(3000);
// react + express
// vue + koa
