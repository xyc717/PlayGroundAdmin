/**
 * Created by xyc on 2016/8/16.
 */
var userModel = require('../../model/system_model/userModel.js');
var userDao = require('../../dao/commonDao.js');
/**
 * 查询用户信息
 * @param data
 * @param callback
 */
exports.query = function(data,callback){
    userDao.query(userModel.query,data, function(err, results){
        if(err){
            callback(true);
            return;
        }
        callback(false, results);
    });
};


/***
 * 查询用户和角色
 * @param data
 * @param callback
 */
exports.queryUserAndRole = function(data,callback){
    userDao.query(userModel.queryUserAndRole,data, function(err, results){
        if(err){
            callback(true);
            return;
        }
        callback(false, results);
    });
};


/**
 * 手机号和姓名不能重复
 * @param data
 * @param callback
 */
exports.updateUserObj = function(data,callback){
    var sql = userModel.update;
    userDao.updateObj(sql,userModel.pk,data, function(err){
        if(err){
            callback(true);
            return;
        }
        callback(false);
    });
};
/**
 * 插入一个新的系统用户
 * @param data
 * @param callback
 */
exports.saveUserObj = function(data,callback){
    userDao.insertObj(userModel.insert,data,function(err,results){
        if(err){
            callback(true);
            return;
        }
        callback(false, results);
    })
};