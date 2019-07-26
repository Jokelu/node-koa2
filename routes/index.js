const router = require("koa-router")();
const controller = require("../controller/user");
router.get("/user", controller.getUserList);
router.post("/login", controller.login);

router.get("/deleteUser", controller.deleteUser);
router.post("/updataUser", controller.updataUser);


module.exports = router;
