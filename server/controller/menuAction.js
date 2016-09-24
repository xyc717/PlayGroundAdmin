/**
 * Created by xyc on 2016/8/16.
 */
var menuService = require("../service/system/menuService");
var express = require('express');
var router = express.Router();
var jwtauth = require('../jwtauth');

router.post("/",function(req,res,next){
    menuService.queryAllMenu(function(err,results){
       // res.json(results);
        res.render("system/menu",{menuList:results});
    });

});

router.post("/getMenuList.do",function(req,res){
    //获取菜单
    var menuData = {userId:req.session.user.userId};
    menuService.queryMenuByUserId(menuData,function(err,results){
        req.session.menuList=results;
        res.json(results);
    });
});
/**
 * 获取所有的菜单
 */
router.post("/getAllMenuList.do",function(req,res){
    menuService.queryAllMenu(function(err,results){
        res.json(results);
    });
});
/***
 * 删除菜单
 */
router.post("/deleteMenu.do",jwtauth,function(req,res){
    var menuData = {menuId:req.body.menuId,is_delete:0};
    menuService.deleteMenu(menuData,function(err){
        var msg = err?"删除失败":"删除成功";
        res.json({msg:msg,status:!err});
    });
});
/****
 * 编辑菜单
 */
router.post("/saveSystemMenu.do",jwtauth,function(req,res){
    var menuData  = JSON.parse(req.body.menu);
    console.log(menuData);

   menuService.createOrUpdateObj(menuData,function(err){
        var isUpdate =menuData.method ;
        var  returnMsgTilte = isUpdate =="edit"?"修改":"新增";
        var msg = err?"失败":"成功";
        returnMsgTilte += msg;
        res.json({msg:returnMsgTilte,status:!err});
    });
});
module.exports = router;