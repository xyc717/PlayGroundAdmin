
var user = {
    userId : "",    //用户编号
    userName : "",  //用户名
    password : "",  //密码
    email: "",      //邮箱
    phone:"",      //电话
    query: "SELECT userId,userName,email,phone FROM user WHERE 1=1 ",
    queryUserAndRole:"SELECT t.userId,t.userName,t.phone, group_concat( t.roleId,'-',t.roleName) as role FROM( SELECT u.userId,u.userName,u.phone,CASE WHEN r.roleId IS NULL THEN 0 ELSE r.roleId END  as roleId ,CASE WHEN r.roleName IS NULL THEN '未选择' ELSE r.roleName END as roleName FROM usergroup ug RIGHT JOIN user u ON ug.userId = u.userId LEFT JOIN role r ON ug.roleid = r.roleid ) AS t group by t.userId",
    queryRoleByUserId :"SELECT * FROM  usergroup where ",
    insert: "INSERT INTO user SET ",
    update: "UPDATE user SET ",
    delete: "DELETE FROM user WHERE userId in ",
    pk: "userId"

}

module.exports = user;  