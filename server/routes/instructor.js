const router = require("express").Router();
const authenticateGeneral = require("../middlewares/authenticationGeneral");
const authenticateInstructor = require("../middlewares/instructor");
const instructorController = require("../controller/instructorController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const pdfController=require('../controller/pdfController')

router.post("/signup", upload.single("profileImage"), instructorController.signuppost);

router.post("/login", instructorController.loginpost);

router.get("/", authenticateGeneral, instructorController.getAllInstructors);

router.get("/getInstructor/:id", authenticateGeneral, instructorController.getInstructorWithId);

router.post("/getInstructorCourses/:id", authenticateGeneral, instructorController.getInstructorCourses);
router.post("/youtube",pdfController.uploadYoutube)

router.post("/pdf",upload.single("pdf"),pdfController.uploadpdf)

router.get("/youtube/:category",pdfController.getyoutube)
router.post("/getInstructorVideos/:id", authenticateGeneral, instructorController.getInstructorVideos);

router.post("/subscribe/:id", authenticateGeneral, instructorController.subscribeInstructor);

router.post("/unsubscribe/:id", authenticateGeneral, instructorController.unsubscribeInstructor);

router.use(authenticateInstructor);

router.get("/getInstructorData", instructorController.getInstructorData);
// router.get("/getInstructorProfileImage/:id", authenticateGeneral, instructorController.getInstructorProfileImage);


// router.post("/instructor/uploadSection", upload.single("image"), instructorController.uploadSection);

// router.post("/instructor/updateVideo" ,upload.single("image"), instructorController.updateVideo);
// router.post("/instructor/updateSection", upload.single("image"), instructorController.updateSection);
// router.post("/instructor/updateCourse", upload.single("image"), instructorController.updateCourse);

// router.post("/instructor/deleteVideo" ,upload.single("image"), instructorController.deleteVideo);
// router.post("/instructor/deleteSection", upload.single("image"), instructorController.deleteSection);
// router.post("/instructor/deleteCourse", upload.single("image"), instructorController.deleteCourse);


module.exports = router;