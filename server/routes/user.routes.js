const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

router.patch("/:userId", auth, async (req, resp) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });

      resp.send(updatedUser);
    } else {
      resp.status(401).json({ error: { message: "Unauthorized", code: 401 } });
    }
  } catch (error) {
    resp.status(500).json({ message: "Server has error please try later" });
  }
});

router.get("/", auth, async (req, resp) => {
  try {
    const list = await User.find();

    resp.status(200).send(list);
  } catch (error) {
    resp.status(500).json({ message: "Server has error please try later" });
  }
});

module.exports = router;
