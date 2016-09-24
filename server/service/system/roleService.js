/**
 * Created by xyc on 2016/8/17.
 */
var roleModel = require("../../model/system_model/roleModel");
var commonDao = require("../../dao/commonDao");

/**
 * 获取权限管理中所有的菜单
 * @param data
 * @param callback
 */
exports.queryAllRoleAndMenu = function(data,callback){
    commonDao.query(roleModel.queryRoleAndMenu,data,function(err,results){
        callback(!err?results:[]);
    });
};
/**
 * 得到所有的菜单
 * @param callback
 */
exports.queryAllMenu = function(callback){
    commonDao.query(roleModel.queryAllMenu,{},function(err,results){
        callback(!err?results:[]);
    });
};
/**
 * 查询权限
 * @param data
 * @param callback
 */
exports.query = function(data,callback){
    commonDao.query(roleModel.query,data,function(err,results){
        if(err){
            callback(true,results);
            return;
        }
        callback(false,results);
    });
};

/**
 * 保存用户角色关系
 * @param data
 * @param callback
 */
exports.saveUserRole = function(data,callback){
   commonDao.delete(roleModel.deleteByUserId,data[0].userId, function(err){
        if(err){
            console.log("delete error");
        }
       var insertBatchSql = roleModel.insertByUserId;
       data.forEach(function(userRole){
           insertBatchSql += "("+userRole.roleId+","+userRole.userId+"),";
       });
       insertBatchSql = insertBatchSql.substring(0,insertBatchSql.length-1);
       console.log("插入语句"+insertBatchSql);
       commonDao.insertObjBatch(insertBatchSql,function(err,results){
           if(err){
               console.log("---新增失败");
               callback(true);
           }
           console.log("---新增成功");
           callback(false);
       });
    });
};
/***
 * 保存权限菜单
 * @param data
 * @param callback
 */
exports.saveRoleMenuList = function(data,callback){
    commonDao.delete(roleModel.deleteRoleGroupByRoleId,data.roleId, function(err){
        if(err){
            console.log("delete error");
        }
        var insertBatchSql = roleModel.insertByRoleId;
        var menuIdList = [];
        if(data.menuIds.indexOf(",") != -1) {
            menuIdList = data.menuIds.split(",");
        }else{
            menuIdList.push(data.menuIds);
        }
        menuIdList.forEach(function(menuId){
            insertBatchSql += "("+menuId+","+data.roleId+"),";
        });
        insertBatchSql = insertBatchSql.substring(0,insertBatchSql.length-1);
        console.log("-------insertSQL:"+insertBatchSql);
        commonDao.insertObjBatch(insertBatchSql,function(err,results){
            callback(!err);
        });
    });
};
/**
 * 删除角色（假删除）
 * @param data
 * @param callback
 */
exports.setRoleDelete = function(data,callback){
    commonDao.updateObj(roleModel.update,roleModel.pk,data, function(err){
      callback(!err);
    });
};
/**
 * 保存编辑的角色信息
 * @param data
 * @param callback
 */
exports.saveRoleInfo = function(data,callback){
    var sql = data.method == "new"?roleModel.insert:roleModel.update;
    commonDao.createOrUpdateObj(sql,data,roleModel.pk,function(err){
        callback(err);
    });
};