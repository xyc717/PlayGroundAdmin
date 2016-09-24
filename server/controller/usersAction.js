var express = require('express');
var router = express.Router();
var fs=require('fs');
var userService = require("../service/system/userService");
var jwtauth = require('../jwtauth');
var url = require('url');
var ReturnObject = require("../model/system_model/returnObject");

/**
 * 进入系统用户管理界面
 */
router.post('/', function(req, res, next) {
  res.render("system/user",{title: "testtest"});
});
/**
 * 查询用户表格
 */
router.post("/getSystemUserList",function(req,res){
  userService.queryUserAndRole({},function(err,results){
    var returnData ={"data":results};
    res.json(returnData);
  });
});
/***
 * 保存用户
 * method="newUser" 就是新增 *
 */
router.post("/saveSystemUser.do" ,jwtauth, function(req,res,next){
    var userData  = JSON.parse(req.body.user);
    var method    = userData.method;
    delete userData.method;
    var msg    = "";
    var status = false;
    var checkData = {phone:userData.phone};
        userService.query(checkData,function(err,queryRestuls){
            if(queryRestuls.length > 0){
                if (method == "newUser"){
                    msg = "手机号名重复!";
                    status = false;
                    res.json({"status":status,"msg":msg});
                }else{
                    if(queryRestuls.length == 1 && queryRestuls[0].userId == userData.userId){
                        checkData["userName"] = userData.userName;
                        checkData["userId"] = userData.userId;
                        userService.updateUserObj(checkData,function(err){
                            status = err;
                            if(!err){
                                msg ="保存成功";
                                status=true;
                            }else{
                                msg ="保存失败";
                                status=false;
                            }
                            res.json({"status":status,"msg":msg});
                        });
                    } else{
                        msg = "手机号名重复!";
                        status = false;
                        res.json({"status":status,"msg":msg});
                    }
                }
            }else{
                if (method == "newUser"){
                    delete userData.userId;
                    userService.saveUserObj(userData,function(err,results){
                        status = err;
                        if(!err){
                            msg ="保存成功";
                            status = true;
                        }else{
                            msg ="保存失败";
                            status = false;
                        }
                        res.json({"status":status,"msg":msg});
                    });
                }

            }
        });



});
/**
 * 检查用户的信息,传入不同的参数可以检查不懂的内容
 */
router.post("/checkUserParam.do",jwtauth,function(req,res,next){
    var userData  = JSON.parse(req.body.user);
    var msg    = "";
    var status = false;
    userService.query(userData,function(err,results){
        status = err;
        if(!err){
            if(results.length > 0){
                status = false;
                msg ="重复";
            }
        }
        res.json({"status":status,"msg":msg});
    });
    res.json(ReturnObject);
});



router.post("/deleteSystemUserById.do",jwtauth,function(req,res,next){
    console.log("----------------删除功能---------------");

    console.log(ReturnObject.msg);
    res.json(ReturnObject);
});




module.exports = router;
