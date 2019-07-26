const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
// 创建token类

class Jwt {
  constructor(data) {
    this.data = data;
  }
  generateToken() {
    let data = this.data;
    let created = Math.floor(Date.now() / 1000);
    let secretKey = "suibian";
    let token = jwt.sign(
      {
        id: data,
        exp: created + 60 * 30
      },
      secretKey
    );
    return token;
  }
  verifyToken() {
    let token = this.data;
    let secretKey = "suibian";
    let res;
    try {
      let result =
        jwt.verify(token, secretKey) || {};
      let { exp = 0 } = result,
        current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = result.data || {};
      }
    } catch (error) {
      res = "err";
    }
    return res;
  }
}
module.exports = Jwt;
