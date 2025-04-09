import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { addComment, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from "../controllers/post.controller.js";

const router = express.Router();

router.route("/addpost").post(isAuthenticated, upload.single('image'), addNewPost);
router.route("/all").get(isAuthenticated,getAllPost);
router.route("/userpost/all").get(isAuthenticated, getUserPost);
router.route("/:id/like").get(isAuthenticated, likePost);
router.route("/:id/dislike").get(isAuthenticated, dislikePost);
router.route("/:id/comment").post(isAuthenticated, addComment); 
router.route("/:id/comment/all").post(isAuthenticated, getCommentsOfPost);
router.route("/delete/:id").delete(isAuthenticated, deletePost);
router.route("/:id/bookmark").get(isAuthenticated, bookmarkPost);

export default router;

// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import upload from "../middlewares/multer.js";
// import { 
//   addComment, 
//   addNewPost, 
//   bookmarkPost, 
//   deletePost, 
//   dislikePost, 
//   getAllPost, 
//   getCommentsOfPost, 
//   getUserPost, 
//   likePost 
// } from "../controllers/post.controller.js";

// const router = express.Router();

// // Post routes
// router.route("/addpost").post(isAuthenticated, upload.single('file'), addNewPost);  // Changed 'image' to 'file' to accept both image and video
// router.route("/all").get(isAuthenticated, getAllPost);
// router.route("/userpost/all").get(isAuthenticated, getUserPost);

// // Like and Dislike routes
// router.route("/:id/like").get(isAuthenticated, likePost);
// router.route("/:id/dislike").get(isAuthenticated, dislikePost);

// // Comment routes
// router.route("/:id/comment").post(isAuthenticated, addComment);
// router.route("/:id/comment/all").get(isAuthenticated, getCommentsOfPost);  // Fixed typo from 'post' to 'get'

// // Delete post route
// router.route("/delete/:id").delete(isAuthenticated, deletePost);

// // Bookmark post route
// router.route("/:id/bookmark").get(isAuthenticated, bookmarkPost);

// export default router;



