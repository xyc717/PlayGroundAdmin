/**
 * Created by xyc on 2016/8/16.
 */


var db = require('./../config/db/database.js');

var req2Sql = require('./../config/db/dbHelper.js');
/**
 * 公共查询方法
 * @param sql
 * @param data
 * @param callback
 */
exports.query = function(sql,data, callback) {
    req2Sql.queryMethod(data, function(reqSql){
        sql += reqSql;
        // get a connection from the pool
        db.mysqlPool.getConnection(function(err, connection) {
            if (err) {
                callback(true);
                connection.release();
                return;
            }
            // make the query
            connection.query(sql, function(err, results) {
                if (err) {
                    callback(true);
                    return;
                }
                console.log("!!!!!:"+results[0]);
                callback(false, results);
                connection.release();
            });
        });
    });
};
/**
 * 根据某一列排序
 * @param sql
 * @param data
 * @param callback
 */
exports.queryOrderByOtherColumn = function(sql,colum,data, callback) {
    db.mysqlPool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
            callback(true);
            return;
        }
        sql += req2Sql.queryNoCallback(data);
        sql += " order by "+colum;
        connection.query(sql, function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            connection.release();
            callback(false, results);

        });
    });
};

/**
 * 通用修改sql
 * @param sql
 * @param data
 * @param callback
 */
exports.insertObj =  function(sql,data,callback){
    req2Sql.insertMethod(data,function(reqSql){
        sql += reqSql;
        // get a connection from the pool
        db.mysqlPool.getConnection(function(err, connection) {
            if (err) {
                callback(true);
                connection.release();
                return;
            }
            // make the query
            connection.query(sql, function(err,results) {
                if (err) {
                    callback(true);
                    return;
                }
                callback(false,results);
                connection.release();
            });
        });
    });
};
/**
 *
 * @param sql
 * @param callback
 */
exports.insertObjBatch =  function(sql,callback){
    db.mysqlPool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            connection.release();
            return;
        }
        // make the query
        connection.query(sql, function(err,results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false,results);
            connection.release();
        });
    });
};
/***
 * 更新对象
 * @param sql
 * @param data
 * @param callback
 */
exports.updateObj = function(sql,pk,data,callback){
    req2Sql.updateObjToDB(data,function(updateSql){
        sql += updateSql;
        sql += " WHERE  "+ pk + "="+data[pk];
        db.mysqlPool.getConnection(function(err, connection) {
            if (err) {
                callback(true);
                connection.release();
                return;
            }
            connection.query(sql, function(err) {
                if (err) {
                    callback(true);
                    return;
                }
                connection.release();
                callback(false);
            });
        });
    });
};

exports.delete = function(sql,data, callback) {
        db.mysqlPool.getConnection(function(err, connection) {
            if (err) {
                callback(true);
                connection.release();
                return;
            }
            // make the query
            var reqSql=req2Sql.deleteObjFromDB2(data);
            console.log("---reqSql:"+reqSql);
            sql += reqSql;
            console.log("---sql:"+sql);
            connection.query(sql, function(err) {
                if (err) {
                    callback(true);
                    return;
                }
                callback(false);
                connection.release();
            });
        });
};
/**
 * 通过判断method字段值选择sql语句
 * @param sql
 * @param data
 * @param callback
 */
exports.createOrUpdateObj = function(sql,data,pk, callback) {
    db.mysqlPool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
            callback(true);
            return;
        }
        var method = data.method;
        delete data.method;
        var updateSql = " WHERE  "+ pk + "="+data[pk];
        var sqlString = method == "edit" ? req2Sql.updateObjToDB2(data)+updateSql :req2Sql.insertMethod2(data);
        //var reqSql=req2Sql.deleteObjFromDB2(data);
        console.log("---sqlString:"+sqlString);
        sql += sqlString;
        console.log("---sql:"+sql);
        connection.query(sql, function(err) {
            connection.release();
            if (err) {
                callback(true);
                return;
            }
            callback(false);
        });
    });
};