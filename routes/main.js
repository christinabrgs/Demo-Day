const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const workoutController = require("../controllers/workouts");
const progressController = require("../controllers/progress");
const detectionController = require("../controllers/detection");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/charts", homeController.getCharts);
router.get("/chartData", homeController.getChartData);
router.get("/workoutData", homeController.getWorkoutData);

// chatgpt form
router.get("/form", ensureAuth, workoutController.getForm)
router.post("/form", ensureAuth, workoutController.createWorkout)


// chatgpt form Results
router.get("/result/:workoutId", ensureAuth, workoutController.getWorkout)
router.put("/result/update/:id", ensureAuth, workoutController.saveWorkout)
router.delete("/result/delete/:id", ensureAuth, workoutController.deleteWorkout)

// edit workout
router.get("/editWorkout/:workoutId", ensureAuth, workoutController.getEditWorkout)
router.post("/editWorkout/:workoutId", ensureAuth, workoutController.saveEditWorkout)

// track workouts
router.get("/tracking", ensureAuth, progressController.getTracking)
router.post("/createLog", ensureAuth, progressController.createLog)
router.post("/getExcercises", ensureAuth, progressController.logSelection)
// router.put("/getExcercises", ensureAuth, progressController.logSelection)

// pose detection
router.get("/detection", ensureAuth, detectionController.getPose)

router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
