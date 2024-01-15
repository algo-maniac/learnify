const router = require("express").Router();
const videoController = require("../controller/videoController");

const multer = require("multer");
const authenticateVideoAccess = require("../middlewares/videoAccess");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get("/getVideo/:id", videoController.getVideoDetails);

router.post("/addComment", authenticateVideoAccess, videoController.createComment);

router.post("/addReply/", authenticateVideoAccess, videoController.addReply);

// router.post("/login", userController.loginpost);

// router.get("/getUserData", userController.getUserData);

// router.get("/image/:id", userController.getUserProfileImage);

module.exports = router;
