const router = require("express").Router();
const courseController = require("../controller/courseController");

const multer = require("multer");
const authenticateInstructor = require("../middlewares/instructor");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



router.post("/uploadCourse", authenticateInstructor, upload.single("thumbnail"), courseController.createCourse);

router.post("/uploadCourse", authenticateInstructor, courseController.createSection);

// router.post("/signup", upload.single("profileImage"), courseController.signuppost);

// router.post("/login", courseController.loginpost);

// router.get("/getUserData", courseController.getUserData);

// router.get("/image/:id", courseController.getUserProfileImage);

module.exports = router;
