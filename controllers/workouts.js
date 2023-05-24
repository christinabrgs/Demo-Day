const cloudinary = require("../middleware/cloudinary");
// const openai = require("../middleware/openai");
const Post = require("../models/Post");
const workout = require("../models/workout");
const ObjectID = require('mongodb').ObjectID

// open ai config
const { Configuration, OpenAIApi } = require("openai");
 

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY
});
const openai = new OpenAIApi(configuration);



module.exports = {
  getForm: async (req, res) => {
    try {
      const thisWorkout = await workout.findById(req.params.workoutId)
      res.render("form.ejs", {
        workout: thisWorkout || { workoutName: `Workout ${req.params?.workoutId} doesn't exist` },
        user: req.user
      });
    } catch (err) {
      console.log(err);
    }
  },
  getWorkout: async (req, res) => {
    console.log('get workout', req.params)
    try {
      const thisWorkout = await workout.findById(ObjectID(req.params.workoutId))

      console.log('thisWorkout', thisWorkout)

      res.render("formResult.ejs", {
        workout: thisWorkout || { workoutName: `Workout ${req.params?.workoutId} doesn't exist` },
        user: req.user
      });
    } catch (err) {
      console.log(err);
    }
  },
  getEditWorkout: async (req, res) => {
    try {
      const thisWorkout = await workout.findById(req.params.workoutId)

      console.log('thisWorkout', thisWorkout)

      res.render("editWorkout.ejs", {
        workout: thisWorkout || { workoutName: `Workout ${req.params?.workoutId} doesn't exist` },
        user: req.user
      });
    } catch (err) {
      console.log(err);
    }
  },
  saveEditWorkout: async (req, res) => {
    console.log(req.params)

    const exerciseData = {
      "workoutJSON.workoutName": req.body.workoutName,
      "workoutJSON.instructions": req.body.instructions,
      "workoutJSON.exercises" : [],
    }
    console.log('exerciseName', req.body.exerciseName)
    for (let i = 0; i < req.body.exerciseName.length; i++) {
      exerciseData["workoutJSON.exercises"][i] = {
        name : req.body.exerciseName[i],
        reps : req.body.exerciseReps[i],
        instructions : req.body.exerciseInstructions[i],
      }     
    }

    console.log('this is the data', exerciseData)
    try {
      await workout.findOneAndUpdate({
        _id: ObjectID(req.params.workoutId),
      },
        [
          { $set: exerciseData }
        ]);
      console.log("Saved Workout", `/result/${req.params.workoutId}`);
      res.redirect(`/result/${req.params.workoutId}`);
    } catch (err) {
      console.log(err);
    }
  },
  saveWorkout: async (req, res) => {

    try {
      await workout.findOneAndUpdate({
        _id: req.params.id,
      },
        [
          { $set: { saved: { $not: "$saved" } } }
        ]);
      console.log("Saved Workout");
      res.redirect(`/result/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  createWorkout: async (req, res) => {
    try {

      let weight = req.body.weight
      let feet = req.body.feet
      let inches = req.body.inches
      let focus = req.body.focus
      let days = req.body.days
      let level = req.body.level
      let goal = req.body.goal
      let notes = req.body.notes

      console.log(weight, feet, inches, focus, days, level, goal)
      console.time('get ai data')
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Create an exercise plan for a person who weighs ${weight} lbs, \nis ${feet} feet ${inches} inches tall,\nwants to focus on ${focus},\nworkout ${days} days a week, is at a ${level} level, and wants to ${goal}. Take into consideration these special circunstances ${notes} when picking the exercises for the workout. Make the workout a json object with a list a of excercises, how many reps and sets, a name and the instructions. Include in the json object a name for the overall workout  as well as the workout instructions. Json should have no line breaks and be formatted like this { "workoutName": "", "instructions": "", "exercises": [{"name":"", "reps":"", "instructions":""},...]}`,
        temperature: 0.7,
        max_tokens: 900,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.timeEnd('get ai data')

      const parsableJSONresponse = response.data.choices[0].text.replace();
      const parsedResponse = JSON.stringify(parsableJSONresponse);
      let workoutJSON = {}
      try {
        workoutJSON = JSON.parse(parsableJSONresponse)
      } catch (e) {
        console.log('couldnt parse the json')
      }

      console.log('response data', workoutJSON, parsableJSONresponse)

      // Use regular expression to match escaped new line characters
      let regex = /\r?\n|\r/g;
      let regex2 = /^\./g
      let regex3 = /^\?/g
      // Replace all matches with an empty string
      let formattedResponse = parsedResponse.replace(regex, "/n")
      formattedResponse = formattedResponse.replace(regex2, "")
      formattedResponse = formattedResponse.replace(regex3, "")
      console.log(formattedResponse)

      // const timeFrame = await openai.createCompletion({
      //   model: "gpt-3.5-turbo",
      //   prompt: `can you give advice on raching this ${goal}. Keep the answer short and concise.`,
      //   temperature: 0.7,
      //   max_tokens: 256,
      //   top_p: 1,
      //   frequency_penalty: 0,
      //   presence_penalty: 0,
      // });

      // const JSONresponse = timeFrame.data.choices[0].text.replace();
      // const parsed = JSON.stringify(JSONresponse);

      // // Replace all matches with an empty string
      // let timeResponse = parsed.replace(regex, "")
      // timeResponse = timeResponse.replace(regex2, "")

      // console.log(timeResponse)

      let thisWorkout = await workout.create({
        workout: formattedResponse,
        user: req.user.id,
        workoutJSON: workoutJSON,
        goal: req.body.goal,
        saved: false,
        notes: " ",
      });
      console.log("Post has been added!", thisWorkout);
      res.redirect(`/result/${thisWorkout._id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteWorkout: async (req, res) => {
    console.log('this is', req.params.id)
    try {
      // Delete workout from db
      await workout.remove({ _id: req.params.id })
      console.log("Deleted Favorite");
      res.redirect("/profile");
    } catch (err) {
      res.redirect(`/result/${req.params.id}`);
    }
  },
};
