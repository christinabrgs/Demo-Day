const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const workout = require("../models/workout");
const log = require("../models/log");
const logSelection = require("../models/logSelection");


module.exports = {
  getTracking: async (req, res) => {
    try {
      const logSelect = logSelection.find()
      const logs = await log.find({user: req.user})
      const workouts = await workout.find({user: req.user})
      res.render("logworkout.ejs", { logs: logs, logSelect: logSelect, workouts: workouts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createLog: async (req, res) => {
    try {

      console.log(req.body)
      for (let i = 0; i < req.body.length; i++) {

        await log.create({
          date: req.body[i].date,
          exercise: req.body[i].exercise,
          set: parseInt(req.body[i].sets),
          reps: parseInt(req.body[i].reps),
          weight: parseInt(req.body[i].weight),
          user: req.user.id,
        })
      };
      console.log("Post has been added!");
      res.redirect("/log");
    } catch (err) {
      console.log(err);
    }
  },
  logSelection: async (req, res) => {
      console.log(req.body)
    try {
      await logSelection.create({
        log: true,
        excercise: req.body.savedWorkouts,
      })
      console.log("Saved Workout");
      res.redirect(`/tracking`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteFav: async (req, res) => {
    console.log('this is', req.params.favID)
    try {
      // Delete post from db
      await favorites.remove({ _id: req.params.favID })
      console.log("Deleted Favorite");
      res.redirect("/favorites");
    } catch (err) {
      res.redirect("/favorites");
    }
  },
};
