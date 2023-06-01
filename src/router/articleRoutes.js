const authenticate = require("../middleware/authenticate");
const Article = require("../models/articleResSch");
const router = require("express").Router();

// router.get("/article", (req, res) => {
//   res.send("hello from article router");
// });

router.post("/users/:userId/article", authenticate, async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.userId;
    const upload = new Article({ title, description, userId: id });
    const saveData = await upload.save();
    return res.status(200).send(saveData);
    // console.log(id);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/articles", authenticate, async (req, res) => {
  try {
    const getData = await Article.find();
    res.status(200).send(getData);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
