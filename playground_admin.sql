/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : nodecrm

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2016-09-09 11:03:45
*/
CREATE DATABASE IF NOT EXISTS playground_admin DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
use playground_admin;
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `menuId` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单编号',
  `menuName` varchar(10) DEFAULT NULL COMMENT '菜单名称',
  `parentId` int(11) DEFAULT NULL COMMENT '父级菜单编号',
  `path` varchar(25) DEFAULT NULL COMMENT '页面路径',
  `level` tinyint(4) DEFAULT NULL COMMENT '菜单顺序',
  `menuIcon` varchar(255) DEFAULT NULL COMMENT '菜单图标',
  `is_delete` tinyint(4) NOT NULL DEFAULT '1' COMMENT '0不显示，1显示',
  PRIMARY KEY (`menuId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='菜单属性表';

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('1', '首页', '0', '#/', '1', 'fa-home', '1');
INSERT INTO `menu` VALUES ('2', '系统设置', '0', 'javascript:;', '1', 'fa-cogs', '1');
INSERT INTO `menu` VALUES ('3', '用户管理', '2', '/user', '1', 'fa-user', '1');
INSERT INTO `menu` VALUES ('4', '角色管理', '2', '/role', '2', 'fa-group', '1');
INSERT INTO `menu` VALUES ('5', '菜单管理', '2', '/menu', '3', 'fa-list-alt', '1');
INSERT INTO `menu` VALUES ('6', '系统日志', '2', '#/sysLog', '4', 'fa-info', '1');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `roleId` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色编号',
  `roleName` varchar(255) DEFAULT NULL COMMENT '角色名称',
  `is_delete` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '是否删除1是删除，0不删除',
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='角色属性表';

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '超级管理员', '0');
INSERT INTO `role` VALUES ('2', '业务用户', '0');
INSERT INTO `role` VALUES ('4', 'aaaa', '0');

-- ----------------------------
-- Table structure for rolegroup
-- ----------------------------
DROP TABLE IF EXISTS `rolegroup`;
CREATE TABLE `rolegroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `roleId` varchar(255) DEFAULT NULL COMMENT '角色编号',
  `menuId` varchar(255) DEFAULT NULL COMMENT '菜单编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8 COMMENT='角色菜单关系表';

-- ----------------------------
-- Records of rolegroup
-- ----------------------------
INSERT INTO `rolegroup` VALUES ('78', '2', '2');
INSERT INTO `rolegroup` VALUES ('79', '2', '3');
INSERT INTO `rolegroup` VALUES ('80', '2', '4');
INSERT INTO `rolegroup` VALUES ('81', '1', '1');
INSERT INTO `rolegroup` VALUES ('82', '1', '2');
INSERT INTO `rolegroup` VALUES ('83', '1', '3');
INSERT INTO `rolegroup` VALUES ('84', '1', '4');
INSERT INTO `rolegroup` VALUES ('85', '1', '5');
INSERT INTO `rolegroup` VALUES ('86', '1', '6');
INSERT INTO `rolegroup` VALUES ('87', '4', '2');
INSERT INTO `rolegroup` VALUES ('88', '4', '3');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `userName` varchar(255) DEFAULT NULL COMMENT '用户名称',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(11) NOT NULL COMMENT '用户手机号',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='用户属性表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '陈浩1', '123456', 'chenhao@node.com', '13180442450');
INSERT INTO `user` VALUES ('2', '田伟', '123456', 'tianwei@node.com', '13180442451');
INSERT INTO `user` VALUES ('3', '陈晨', '123456', 'chenchen@node.com', '13180442452');
INSERT INTO `user` VALUES ('4', '陈浩然', '123456', 'chenhaoran@node.com', '13180442453');
INSERT INTO `user` VALUES ('10', '薛宇晨', '1q2w3e4r', null, '18832112556');
INSERT INTO `user` VALUES ('12', '啊啊', '1q2w3e4r', null, '18832112551');
INSERT INTO `user` VALUES ('13', '信息', '1q2w3e', null, '18832112552');
INSERT INTO `user` VALUES ('14', '行行行', '1q2w3e', null, '18832112554');
INSERT INTO `user` VALUES ('15', '吊吊吊', '1q2w3e', null, '18832112553');

-- ----------------------------
-- Table structure for usergroup
-- ----------------------------
DROP TABLE IF EXISTS `usergroup`;
CREATE TABLE `usergroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `roleId` varchar(255) DEFAULT NULL COMMENT '角色编号',
  `userId` varchar(255) DEFAULT NULL COMMENT '用户编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COMMENT='用户角色关系表';

-- ----------------------------
-- Records of usergroup
-- ----------------------------
INSERT INTO `usergroup` VALUES ('1', '1', '1');
INSERT INTO `usergroup` VALUES ('3', '2', '1');
INSERT INTO `usergroup` VALUES ('36', '4', '2');
