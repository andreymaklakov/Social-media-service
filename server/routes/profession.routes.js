const express = require("express");
const router = express.Router({ mergeParams: true });
const Profession = require("../models/Profession");

router.get("/", async (req, resp) => {
  try {
    const list = await Profession.find();

    resp.status(200).send(list);
  } catch (error) {
    resp.status(500).json({ message: "Server has error please try later" });
  }
});

module.exports = router;
