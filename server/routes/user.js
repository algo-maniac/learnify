const router = require("express").Router();
const userController = require("../controller/userController");

// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["Authorization"];
//   if (typeof bearerHeader !== "undefined") {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }

router.get("/signup", userController.signup);

router.post("/signup", userController.signuppost);

router.get("/login", userController.login);

router.post("/login", userController.loginpost);

router.get("/logout", userController.logout);

module.exports = router;
