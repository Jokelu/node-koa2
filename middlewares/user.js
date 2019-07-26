const query = require("../db/mysql");
//  登录
const login = name => {
  let sql = `select * from user where username="${name}"`;
  return query(sql);
};
//  查询所有用户
const getUserList = () => {
  let sql = "SELECT * FROM user";
  return query(sql);
};
//  删除用户
const deleteUser = id => {
  let sql = `delete from user where userId="${id}"`;
  return query(sql);
};
// 更新用户
const updataUser = data => {
  let sql = "update user set username=?,password=? where userId=?";
  return query(sql, data);
};
module.exports = {
  login,
  getUserList,
  deleteUser,
  updataUser
};
