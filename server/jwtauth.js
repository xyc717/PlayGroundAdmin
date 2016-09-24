/**
 * Created by xyc on 2016/8/29.
 */
var url = require('url');
var jwt = require('jwt-simple');
var userService = require("./service/system/userService");
module.exports = function(req, res, next){

    // Parse the URL, we might need this
    var parsed_url = url.parse(req.url, true);
    var token = (req.body && req.body.access_token) || parsed_url.query.access_token || req.headers["x-access-token"];
    if (token) {
        try {
            var decoded = jwt.decode(token,"playGroundAdmin");
            if (decoded.exp <= Date.now()) {
                res.end('Access token has expired', 400);
            }
            var loginUserData = {userId: decoded.iss};
            userService.query(loginUserData,function(err,results){
                console.lo
                if (!err) {
                    req.user = results[0];
                    return next();
                }
            });
        } catch (err) {
            return next();
        }
    } else {
        next();
    }
}