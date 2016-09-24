/**
 * Created by xyc on 2016/9/1.
 */
var express = require("express");
var router  = express.Router();
var roleService = require("../service/system/roleService");
var jwtauth = require('../jwtauth');


router.post('/', function(req, res, next) {
    res.render("system/role",{AA: "testtest"});
});
/**
 * 首先获取所有的菜单
 */
router.post("/getAllMenuInRole.do",function(req,res){
    roleService.queryAllMenu(function(result){
        console.log(result.length);
        res.json({"data":result});
    });
});
/***
 * 编辑权限信息(目前主要是名称)
 */
router.post("/saveRoleInfo.do",jwtauth,function(req,res){
    var roleData = JSON.parse(req.body.role);
    console.log(roleData);
    roleService.saveRoleInfo(roleData,function(err){
        console.log(err);
        var msg = err?"保存角色失败!":"保存角色成功";
        res.json({msg:msg,status:!err});
    });
});

/**
 * 权限管理页面表格
 */
router.post("/getAllRoleAndMenu.do",function(req,res){
        roleService.queryAllRoleAndMenu({},function(results){
            var returnData ={"data":results};
            res.json(returnData);
        });
});

/***
 * 获取权限
 */
router.post("/getAllRoles.do",function(req,res,next){
    roleService.query({},function(err,results){
            var returnData ={"data":results};
            res.json(returnData);
        });
});
/**
 * 保存用户角色信息
 */
router.post("/saveUserRole.do",jwtauth,function(req,res,next){
    var userRole = JSON.parse(req.body.userRole);
    console.log(JSON.stringify(userRole));
    roleService.saveUserRole(userRole,function(err){
        var msg = err?"保存用户角色失败!":"保存用户角色成功";
        res.json({msg:msg,status:!err});
    });
});
/***
 * 先删除旧的权限菜单配置,然后重新插入
 */
router.post("/updateRoleMenu.do",jwtauth,function(req,res){
    var data = {};
    data.roleId=req.body.roleId;
    data.menuIds = req.body.menuIds;
    //先删除旧的关系,之后插入
    roleService.saveRoleMenuList(data,function(err){
        var msg = err?"保存角色菜单成功":"保存角色菜单失败!";
        res.json({msg:msg,status:err});
    });
});
/***
 * 删除角色
 */
router.post("/setRoleDelete.do",jwtauth,function(req,res){
    var data = {};
    data.roleId=req.body.roleId;
    data.is_delete=1;
    roleService.setRoleDelete(data,function(stat){
        var msg = stat?"删除角色成功":"删除角色失败!";
        console.log(msg+"--"+stat);
        res.json({msg:msg,status:stat});
    });
});
module.exports = router;