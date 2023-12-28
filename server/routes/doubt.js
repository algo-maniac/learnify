const router = require("express").Router();
const mongoose = require("mongoose");
const multer = require("multer");
const doubtController = require("../controller/doubtController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/doubt", doubtController.getDoubts);

router.post("/doubt", upload.single("image"), doubtController.postDoubt);

router.post("/doubt/comment", doubtController.getComment);

module.exports = router;