 
'use strict';
var role = {
    roleId : "",    //角色编号
    roleName : "",  //角色名
    queryByUserId: "SELECT t1.* FROM role t1, usergroup t2 WHERE t1.roleId = t2.roleId ",
    queryAllMenu:"SELECT m.menuId,m.parentId,m.menuName FROM menu m WHERE m.is_delete=1 order by m.parentId asc",
    queryRoleAndMenu:"SELECT t.roleId,  t.roleName,group_concat(t.parentId,'-',t.menuId, '-', t.menuName) AS menuName FROM( SELECT r.roleId,  r.roleName,CASE WHEN m.menuId IS NULL THEN 0 ELSE m.menuId END AS menuId, CASE WHEN m.menuName IS NULL THEN '未选择'ELSE m.menuName END AS menuName,m.parentId FROM rolegroup rg RIGHT JOIN role r ON rg.roleId = r.roleId LEFT JOIN menu m ON rg.menuId = m.menuId where r.is_delete=0) AS t GROUP BY t.roleId ",
    insertByUserId: "INSERT INTO usergroup (roleId, userId) VALUES ",
    insertByRoleId: "INSERT INTO rolegroup (menuId, roleId) VALUES ",
    deleteByUserId: "DELETE FROM usergroup WHERE userId in ",
    deleteRoleGroupByRoleId: "DELETE FROM rolegroup WHERE roleId in ",
    query: "SELECT * FROM role WHERE 1=1 ",
    insert: "INSERT INTO role SET ",
    update: "UPDATE role SET ",
    delete: "DELETE FROM role WHERE roleId in ",
    pk: "roleId"
}

module.exports = role;