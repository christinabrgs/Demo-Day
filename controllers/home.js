const log = require("../models/log");
const workout = require("../models/workout");
// const advice = require("../models/advice");



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
    // console.log(logs)
    res.json({logs: logs});
  },
  getWorkoutData: async (req, res) => {

    const workouts = await workout.find({user: req.user})
    res.json({workouts: workouts});
  },
  // readData: async (req, res) => {
  //   try {

  //     const logs = await log.find({user: req.user})

  //     console.log(logs)
  //     const logPARSE = JSON.stringify(logs)
  //     // console.time('get ai data')
  //     const response = await openai.createCompletion({
  //       model: "text-davinci-003",
  //       prompt: `read all the exercise logs in this data, ${logPARSE}, formatted as JSON and give advice and suggestions on where the user can make improvements. 1 on 'rating' means easy, while '5' means difficult. Tell them if they are making progress in their training. Make the response a json object with a property for their progress, advice, and suggestions. Json should have no line breaks and be formatted like this { "progress": "", "advice": "", "suggestions": "" }`,
  //       temperature: 0.7,
  //       max_tokens: 500,
  //       top_p: 1,
  //       frequency_penalty: 0,
  //       presence_penalty: 0,
  //     });
  //     // console.timeEnd('get ai data')

  //     const parsableJSONresponse = response.data.choices[0].text.replace();
  //     const parsedResponse = JSON.stringify(parsableJSONresponse);
  //     let adviceJSON = {}
  //     try {
  //       adviceJSON = JSON.parse(parsableJSONresponse)
  //     } catch (e) {
  //       console.log('couldnt parse the json')
  //     }

  //     console.log('response data', adviceJSON, parsableJSONresponse)

  //     // Use regular expression to match escaped new line characters
  //     let regex = /\r?\n|\r/g;
  //     let regex2 = /^\./g
  //     let regex3 = /^\?/g
  //     // Replace all matches with an empty string
  //     let formattedResponse = parsedResponse.replace(regex, "/n")
  //     formattedResponse = formattedResponse.replace(regex2, "")
  //     formattedResponse = formattedResponse.replace(regex3, "")
  //     console.log(formattedResponse)

  //     let thisAdvice = await advice.create({
  //       oiriginalAdvice: formattedResponse,
  //       adviceJSON: adviceJSON,
  //       user: req.user.id,
  //     });
  //     console.log("Post has been added!", thisAdvice);
  //     res.redirect(`/charts`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};


//  /charts/${thisAdvice._id}