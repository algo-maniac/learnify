const router = require("express").Router();
const userController = require("../controller/userController");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/signup", upload.single("profileImage"), userController.signuppost);

router.post("/login", userController.loginpost);

router.get("/getUserData", userController.getUserData);

router.get("/image/:id", userController.getUserProfileImage);

module.exports = router;
