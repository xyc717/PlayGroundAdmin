/**
 * Created by xyc on 2016/8/17.
 */
var menuModel = require("../../model/system_model/menuModel");
var commonDao = require("../../dao/commonDao");

/**
 * 通过用户ID查询
 * @param err
 * @param callback
 */
exports.queryMenuByUserId = function(data,callback){

    commonDao.queryOrderByOtherColumn(menuModel.queryByUserId,menuModel.pk,data,function(err,results){
        if(err){
            callback(true,results);
            return;
        }
        callback(false,results);
    });
};
/**
 * 更新菜单的状态为0
 * @param data
 * @param callback
 */
exports.deleteMenu = function(data,callback){
    commonDao.updateObj(menuModel.update,menuModel.pk,data,function(err){
        callback(err);
    });
};
/**
 * 通过用户ID查询
 * @param err
 * @param callback
 */
exports.queryAllMenu = function(callback){
    commonDao.query(menuModel.queryAllMenu,{},function(err,results){
        if(err){
            callback(true,results);
            return;
        }
        var menuList = new Array();
        var parentMenuMap = new Array();
        results.forEach(function(menuObj){
            if(menuObj.parentId == 0){
                parentMenuMap[menuObj.menuId] = menuObj;
            }else{
                menuList.push(menuObj);
            }
        });
        if(parentMenuMap[0] == null){
            parentMenuMap.splice(0,1);
        }
        var parentMenuList  = [];
        parentMenuMap.forEach(function(parentMenuObj){
            var parentMenu  = {};
            var subMenuMapList = new Array();
            menuList.forEach(function(subMenuObj){
                if(subMenuObj.parentId == parentMenuObj.menuId){
                    subMenuMapList.push(subMenuObj);
                }
            });
            parentMenuObj.subMenu = subMenuMapList;
            parentMenu.subMenu  = subMenuMapList;
            parentMenu.menuId = parentMenuObj.menuId;
            parentMenu.menuName = parentMenuObj.menuName;
            parentMenu.parentId = parentMenuObj.parentId;
            parentMenuList.push(parentMenu);
        });

        callback(false,parentMenuList);
    });
};

/**
 * 查询菜单
 * @param data
 * @param callback
 */
exports.query = function(data,callback){
    commonDao.query(menuModel.query,data,function(err,results){
        if(err){
            callback(true,results);
            return;
        }
        callback(false,results);
    });
};
/**
 * 编辑或者新增
 * @param data
 * @param callback
 */
exports.createOrUpdateObj = function(data,callback){
    var sql = data.method == "edit" ? menuModel.update : menuModel.insert;
        commonDao.createOrUpdateObj(sql,data,menuModel.pk,function(err){
            callback(err);
        });
};