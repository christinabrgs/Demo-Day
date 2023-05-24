const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const workout = require("../models/workout");


module.exports = {
  getPose: async (req, res) => {
    try {
      
      const workouts = await workout.find()
      res.render("detection.ejs", { workouts: workouts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createLog: async (req, res) => {
    try {

      let createdAt = req.body.createdAt
      let exercise = req.body.exercise
      let setNumber = req.body.setNumber
      let reps = req.body.reps
      let weight = req.body.weight
      
      console.log(createdAt, exercise, setNumber, reps, weight)

      await workout.create({
        date: createdAt,
        exercise: exercise,
        setNumber: setNumber,
        reps: reps,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/logs");
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
