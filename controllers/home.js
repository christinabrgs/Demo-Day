const log = require("../models/log");
const workout = require("../models/workout");

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getCharts: async (req, res) => {

    const logs = await log.find({user: req.user})
    res.render("canvas.ejs", {logs: logs});
  },
  getChartData: async (req, res) => {
    
    const logs = await log.find({user: req.user})
    console.log(logs)
    res.json({logs: logs});
  },
  getWorkoutData: async (req, res) => {

    const workouts = await workout.find({user: req.user})
    res.json({workouts: workouts});
  },
};
