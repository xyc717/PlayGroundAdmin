/**
 * Created by xyc on 2016/8/11.
 */
var mysql = require("mysql");
var config = require("./config");
var mysqlPool = mysql.createPool(config.mysql_dev);
exports.mysqlPool = mysqlPool;