var express = require('express');
var router = express.Router();
var userService = require("../service/system/userService");
var moment       = require('moment');
var jwt          = require("jwt-simple");

/**
 * 主页,如果session中没有用户信息,则跳转到登录界面
 */
router.get("/",function(req, res, next) {
  //如果没找到用户信息就进入login.html
    if(null!=req.session.user){
        var user=req.session.user;
        var expires = moment().add(7,'days' ).valueOf();
        var token = jwt.encode({
            iss: user.userId,
            exp: expires
        },"playGroundAdmin");
        res.render('main', { title: 'Express' ,token : token, expires: expires,user: JSON.parse(JSON.stringify(user))});
    }else{
        res.render("login", {title: "XXXX"});
    }


});

/**
 * 登录页面
 */
router.get("/login.html",function(req,res,next){
  res.render("login",{title: "XXXX"});
});
/**
 * 登录方法
 */
router.post("/loginInto",function(req,res,next){
  //登录信息对象
  var loginUserData = {phone:req.body.userPhone,password:req.body.password};
  console.log("登录信息:"+loginUserData);
  //登录service
  userService.query(loginUserData,function(err,result){
      if(err || result.length<=0){
        res.redirect("/login.html");
        return;
      }
     req.session.user = result[0];
      res.redirect("/");
  });

});
router.post("/test",function(req,res,next){
  res.render("farmar/test",{title: "testtest"});
});

module.exports = router;
