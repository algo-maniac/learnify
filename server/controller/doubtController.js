const Post = require("../models/post");
const mongoose = require("mongoose");

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'doubts',
  });
});

module.exports.getDoubts = async (req, res, next) => {
  const posts = Post.find()
    .sort({ _id: -1 })
    .limit(10)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((er) => {
      console.log("error");
    });
}

module.exports.postDoubt = async (req, res, next) => {
  const question = req.body.question;
  let imgUrl = "";
  if (req.file != null) {
    imgUrl = req.file.path;
  }
  const date = new Date();
  const name = req.body.name;
  const comment = [];
  const post = new Post({
    name: name,
    date: date,
    question: question,
    comments: comment,
    img: imgUrl,
  });
  post.save();
  res.json({ msg: "posted created" });
}

module.exports.getComment = async (req, res, next) => {
  const id = req.body.id;
  const comment = req.body.comment;
  const name = req.body.name;
  const d = new Date();
  const date = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()}`;
  console.log(date);
  const post = await Post.findOne({ _id: id });
  if (post) {
    post.comments.push({ comment: comment, date: date, name: name });
    post.save().then().catch();
    res.json({ msg: "Answer added" });
  }
}
