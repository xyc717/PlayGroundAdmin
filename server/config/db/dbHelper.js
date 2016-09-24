/**
 * Created by xyc on 2016/8/11.
 */

/**
 * 通用查询方法
 * @param data request.body
 * @param callback 将 拼接好的sql语句传给回调函数
 */
exports.queryMethod = function(data,callback){
    var sql = "";
    for (var key in data){
        sql += " and " +  key + " = '" + data[key] + "' ";
    }
    callback(sql);
};
/**
 * 返回sql语句,没有回调函数
 * @param data
 * @returns {string}
 */
exports.queryNoCallback = function(data){
    var sql = "";
    for (var key in data){
        sql += " and " +  key + " = '" + data[key] + "' ";
    }
    return sql;
};
/**
 * 插入语句
 * @param data
 * @param callback
 */
exports.insertMethod = function(data, callback){
    var sql = "";
    for(var key in data){
        if(sql.length == 0){
            sql += key + " = '" + data[key] + "' ";
        }else{
            sql += " , " + key + " = '" + data[key] + "' ";
        }
    }
    callback(sql);
};
exports.insertMethod2 = function(data){
    var sql = "";
    for(var key in data){
        if(sql.length == 0){
            sql += key + " = '" + data[key] + "' ";
        }else{
            sql += " , " + key + " = '" + data[key] + "' ";
        }
    }
   return sql;
};
/**
 *
 * @param data
 * @param callback
 */
exports.updateObjToDB = function(data, callback){
    var sql = "";
    for(var key in data){
        if(sql.length == 0){
            sql += key + " = '" + data[key] + "' ";
        }else{
            sql += " , " + key + " = '" + data[key] + "' ";
        }
    }
    callback(sql);
};
exports.updateObjToDB2 = function(data){
    var sql = "";
    for(var key in data){
        if(sql.length == 0){
            sql += key + " = '" + data[key] + "' ";
        }else{
            sql += " , " + key + " = '" + data[key] + "' ";
        }
    }
   return sql;
};
/**
 * 删除
 * @param data
 * @param callback
 */
exports.deleteObjFromDB = function(data, callback){
    var sql = "(";
    sql += data.toString();
    sql += ")";
    callback(sql);
};

exports.deleteObjFromDB2 = function(data){
    var sql = "(";
    sql += data.toString();
    sql += ")";
    return sql;
};