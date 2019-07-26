const userModel = require("../middlewares/user");
const JwtUtil = require("../middlewares/jwt");
// 登录
const login = async ctx => {
  let params = ctx.request.body;
  try {
    let result = await userModel.login(params.username);
    if (params.password == result[0].password) {
      // 登陆成功，添加token验证
      let userId = result[0].userId.toString();
      // 将用户id传入并生成token
      let jwt = new JwtUtil(userId);
      let token = jwt.generateToken();
      // 将 token 返回给客户端
      ctx.body = { success: true, msg: "登陆成功", token: token };
    } else {
      res.body = { success: false, msg: "账号密码错误" };
    }
    // ctx.body = {
    //   success: true,
    //   data: result,
    //   message: "登录成功"
    // };
  } catch (error) {
    ctx.body = {
      success: false,
      data: null,
      message: "用户不存在"
    };
  }
};
// 获取用户列表
const getUserList = async ctx => {
  let result = await userModel.getUserList();
  ctx.body = {
    success: true,
    data: result
  };
};
// 删除用户
const deleteUser = async ctx => {
  let id = ctx.query.id;
  try {
    const result = await userModel.deleteUser(id);
    ctx.body = {
      message: result,
      success: true
    };
  } catch (error) {
    ctx.body = {
      message: "删除失败",
      success: false
    };
  }
};
// 更新用户
const updataUser = async ctx => {
  let params = ctx.request.body;
  let data = [params.username, params.password, params.id];
  try {
    const result = await userModel.updataUser(data);
    ctx.body = {
      message: result
    };
  } catch (error) {
    ctx.body = {
      message: error
    };
  }
};
module.exports = {
  login,
  getUserList,
  deleteUser,
  updataUser
};
