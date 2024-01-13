const router = require("express").Router();
const authenticateGeneral = require("../middlewares/authenticationGeneral");
const authenticateInstructor = require("../middlewares/instructor");
const instructorController = require("../controller/instructorController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/signup", upload.single("profileImage"), instructorController.signuppost);
router.post("/login", instructorController.loginpost);

// router.get("/instructor", authenticateGeneral, instructorController.getAllInstructors);
// router.get("/instructor/:id", authenticateGeneral, instructorController.getInstructorWithId);

router.use(authenticateInstructor);

router.get("/getInstructorData", instructorController.getInstructorData);
// router.get("/getInstructorProfileImage/:id", authenticateGeneral, instructorController.getInstructorProfileImage);


router.post("/uploadVideo", upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), instructorController.uploadVideo);
// router.post("/instructor/uploadSection", upload.single("image"), instructorController.uploadSection);
// router.post("/instructor/uploadCourse", upload.single("image"), instructorController.uploadCourse);

// router.post("/instructor/updateVideo" ,upload.single("image"), instructorController.updateVideo);
// router.post("/instructor/updateSection", upload.single("image"), instructorController.updateSection);
// router.post("/instructor/updateCourse", upload.single("image"), instructorController.updateCourse);

// router.post("/instructor/deleteVideo" ,upload.single("image"), instructorController.deleteVideo);
// router.post("/instructor/deleteSection", upload.single("image"), instructorController.deleteSection);
// router.post("/instructor/deleteCourse", upload.single("image"), instructorController.deleteCourse);


module.exports = router;