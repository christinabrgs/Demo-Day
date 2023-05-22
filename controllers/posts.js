const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const workout = require("../models/workout");
const comments = require("../models/comments");
const log = require("../models/log");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const logs = await log.find({ user: req.user.id})
      const workouts = await workout.find({ user: req.user.id, saved: true })
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { logs: logs, posts: posts, workouts,  user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id}).sort({ createdAt: "desc" }).lean();
      //console.log('posts', posts)
      res.render("feed.ejs", { posts: posts,  user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const postComments = await comments.find({postID: req.params.id})
      console.log('what is this', req.params.id)
      const post = await Post.findById(req.params.id);
      console.log('g')
      res.render("post.ejs", { post: post, user: req.user, comments: postComments});
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      let result = {}
      if(req?.file?.path){
        result  = await cloudinary.uploader.upload(req.file.path);
      }

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
  createComment: async (req, res) => {
    try {
      console.log ('this is a request', req.body.postID)
      await comments.create({
        postID: req.body.postID,
        comment: req.body.comment,
        user: req.user.id,
        createdAt: 0,
      });
      console.log("Post has been added!");
      res.redirect(`/post/${req.body.postID}`);
    } catch (err) {
      console.log(err);
    }
  }
};
