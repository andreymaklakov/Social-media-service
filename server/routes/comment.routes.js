const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const Comment = require("../models/Comment");

router
  .route("/")
  .get(auth, async (req, resp) => {
    try {
      const { orderBy, equalTo } = req.query;

      const list = await Comment.find({ [orderBy]: equalTo });

      resp.send(list);
    } catch (error) {
      resp.status(500).json({ message: "Server has error please try later" });
    }
  })
  .post(auth, async (req, resp) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.user._id,
      });

      resp.status(201).send(newComment);
    } catch (error) {
      resp.status(500).json({ message: "Server has error please try later" });
    }
  });

router.delete("/:commentId", auth, async (req, resp) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (comment.userId.toString() === req.user._id) {
      await comment.remove();
      return resp.send(null);
    } else {
      return resp
        .status(401)
        .json({ error: { message: "Unauthorized", code: 401 } });
    }
  } catch (error) {
    resp.status(500).json({ message: "Server has error please try later" });
  }
});

module.exports = router;
