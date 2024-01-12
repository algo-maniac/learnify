const router = require("express").Router();
const authenticateAdmin = require("../middlewares/admin");
const adminController = require("../controller/adminController");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/signup", upload.single('profileImage'), adminController.signuppost);

router.post("/login", adminController.loginpost);

router.get("/getAdminData", authenticateAdmin, adminController.getAdminData);

router.post("/approveInstructor", authenticateAdmin, adminController.approveInstructor);

router.post("/denyInstructor", authenticateAdmin, adminController.denyInstructor);

router.get("/getPendingRequests", authenticateAdmin, adminController.getPendingRequests);

module.exports = router;
