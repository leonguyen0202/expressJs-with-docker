import express from "express";
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.status(200).send("Calling index route.");
});

export default router;
