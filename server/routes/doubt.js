const router = require("express").Router();
const doubtController = require("../controller/doubtController");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get("/doubt", doubtController.getDoubts);

router.post("/doubt", upload.single("image"), doubtController.postDoubt);

router.post("/doubt/comment", doubtController.getComment);

module.exports = router;