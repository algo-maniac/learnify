const router = require("express").Router();
const teacherController = require("../controller/teacherController");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/teacher/uploadVideo", upload.single("image"), teacherController.uploadVideo);

router.get("/teacher", teacherController.getAllTeachers);

router.get("/teacher/:id", teacherController.getTeacherWithId);


module.exports = router;