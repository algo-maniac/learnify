const router = require("express").Router();
const userController = require("../controller/userController");
const authenticateUser = require("../middlewares/user");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/signup", upload.single("profileImage"), userController.signuppost);

router.post("/login", userController.loginpost);

// router.get("/enrolledCourses", authenticateUser, userController.getEnrolledCourses);

// router.get("/purchasedCourses", authenticateUser, userController.getPurchasedCourses);

// router.get("/wishlistedCourses", authenticateUser, userController.getWishlistedCourses);

// router.post("/enroll/:courseId", authenticateUser, userController.enrollIntoCourse);

// router.post("/purchase/:courseId", authenticateUser, userController.purchaseCourse);

// router.post("/wishlist/:courseId", authenticateUser, userController.wishListCourse);

router.get("/getUserData", authenticateUser, userController.getUserData);


module.exports = router;
