const router = require("express").Router();
const courseController = require("../controller/courseController");

const multer = require("multer");
const authenticateInstructor = require("../middlewares/instructor");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



router.post("/createCourse", authenticateInstructor, upload.single("thumbnail"), courseController.createCourse);

router.delete("/deleteCourse/:courseId", authenticateInstructor, courseController.deleteCourse);

router.put("/editBasicCourseDetails/:courseId", authenticateInstructor, upload.single("thumbnail"), courseController.editBasicCourseDetails);

router.put("/editSectionDetails/:courseId/:sectionId", authenticateInstructor, upload.none(), courseController.editSectionDetails);

router.put("/editVideoDetails/:videoId", authenticateInstructor, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), courseController.editVideoDetails);

router.delete("/deleteVideo/:videoId", authenticateInstructor, courseController.deleteVideo);

router.delete("/deleteSection/:sectionId", authenticateInstructor, courseController.deleteSection);

router.post("/createSection", authenticateInstructor, upload.none(), courseController.createSection);

router.get("/getCourse/:id", authenticateInstructor, courseController.getCourse);

// router.post("/signup", upload.single("profileImage"), courseController.signuppost);

// router.post("/login", courseController.loginpost);

// router.get("/getUserData", courseController.getUserData);

// router.get("/image/:id", courseController.getUserProfileImage);

module.exports = router;
