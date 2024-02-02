const router = require("express").Router();
const videoController = require("../controller/videoController");

const multer = require("multer");
const authenticateVideoAccess = require("../middlewares/authenticateVideoAccess");
const authenticateInstructor = require("../middlewares/instructor");
const authenticateGeneral = require("../middlewares/authenticationGeneral");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/uploadVideo", authenticateInstructor, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), videoController.uploadVideo);

router.post("/getVideos", authenticateGeneral, videoController.getVideos);

router.use(authenticateVideoAccess);

router.post("/getVideo", videoController.getVideoDetails);

router.post("/addComment", videoController.createComment);

router.post("/addReply", videoController.addReply);

router.post('/addLike', videoController.addLike);

router.post('/removeLike', videoController.removeLike);

// router.post("/login", userController.loginpost);

// router.get("/getUserData", userController.getUserData);

// router.get("/image/:id", userController.getUserProfileImage);

module.exports = router;
