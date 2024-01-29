const router = require("express").Router();
const authenticateCourseEditAccess = require('../middlewares/authenticateCourseEditAccess');
const courseController = require("../controller/courseController");

const multer = require("multer");
const authenticateInstructor = require("../middlewares/instructor");
const authenticateGeneral = require("../middlewares/authenticationGeneral")
const authenticateCourseAccess = require("../middlewares/authenticateCourseAccess");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



router.get("/enrolledCourses", authenticateGeneral, courseController.getEnrolledCourses);

router.get("/purchasedCourses", authenticateGeneral, courseController.getPurchasedCourses);

router.post("/createCourse", authenticateInstructor, upload.single("thumbnail"), courseController.createCourse);

router.get("/getCourse/:courseId", authenticateCourseAccess, courseController.getCourseDetails);

router.get("/getCourseDetailsForEdit/:courseId", authenticateCourseEditAccess, courseController.getCourseDetailsForEdit);

router.delete("/deleteCourse/:courseId", authenticateCourseEditAccess, courseController.deleteCourse);

router.put("/editBasicCourseDetails/:courseId", authenticateCourseEditAccess, upload.single("thumbnail"), courseController.editBasicCourseDetails);

router.post("/createSection/:courseId", authenticateCourseEditAccess, upload.none(), courseController.createSection);

router.put("/editSectionDetails/:courseId/:sectionId", authenticateCourseEditAccess, upload.none(), courseController.editSectionDetails);

router.delete("/deleteSection/:sectionId", authenticateCourseEditAccess, courseController.deleteSection);

router.post("/uploadCourseVideo", authenticateInstructor, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), courseController.uploadCourseVideo);

router.put("/editVideoDetails/:videoId", authenticateCourseEditAccess, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), courseController.editVideoDetails);

router.delete("/deleteVideo/:videoId", authenticateCourseEditAccess, courseController.deleteVideo);




// router.post("/signup", upload.single("profileImage"), courseController.signuppost);

// router.post("/login", courseController.loginpost);

// router.get("/getUserData", courseController.getUserData);

// router.get("/image/:id", courseController.getUserProfileImage);

module.exports = router;
