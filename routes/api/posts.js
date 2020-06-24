const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

const validatePostInput = require("../../validation/post");
// @route GET api/posts/tests
// @desc tests post route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route GET api/posts
// @desc Get users post by id
// @access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) =>
      res.status(404).json({ noPostfound: "No posts found for user" })
    );
});
// @route GET api/posts/:id
// @desc Get users post route
// @access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ noPostfound: "No post found with that id" })
    );
});
// @route Post api/posts
// @desc create post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(404).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });

    newPost
      .save()
      .then((post) => res.json(post))
      .catch((err) => console.log(err));
  }
);

// @route Delete api/posts/:id
// @desc delete post
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            //check for post own
            if (post.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ notauthorized: "User not authorized" });
            }
            //Delete
            post
              .remove()
              .then(() => res.json({ success: true }))
              .catch((err) =>
                res.status(404).json({ postnotfound: "No post found" })
              );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);

// @route post api/posts/like/:id
// @desc like post
// @access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            if (
              post.likes.filter((like) => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyliked: "user already liked post" });
            }
            //Add user id to likes array
            post.likes.unshift({
              user: req.user.id,
            });
            post.save().then((post) => res.json(post));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);

// @route post api/posts/unlike/:id
// @desc unlike post
// @access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        Post.findById(req.params.id)
          .then((post) => {
            if (
              post.likes.filter((like) => like.user.toString() === req.user.id)
                .length === 0
            ) {
              return res.status(400).json({ notliked: "Post has not be like" });
            }
            //Get remove index
            const removeIndex = post.likes
              .map((item) => item.user.toString())
              .indexOf(req.user.id);

            post.likes.splice(removeIndex, 1);
            post.save().then((post) => res.json(post));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);

// @route post api/posts/comment/:id
// @desc comment post
// @access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(404).json(errors);
    }
    Post.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };
        post.comments.unshift(newComment);

        post
          .save()
          .then((post) => res.json(post))
          .catch((err) => console.log(err));
      })
      .catch((err) => res.status(404).json({ postnotfound: "no post found" }));
  }
);

// @route Delete api/posts/comment/:id/:comment_id
// @desc remove comment post
// @access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        //check if the comment exists
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexist: "comment does not exist" });
        }

        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);
        post
          .save()
          .then((post) => res.json(post))
          .catch((err) => console.log(err));
      })
      .catch((err) => res.status(404).json({ postnotfound: "no post found" }));
  }
);
module.exports = router;
