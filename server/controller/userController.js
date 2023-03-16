const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Creating JWT
const age = 3 * 60 * 60 * 24;
const createToken = (id) => {
  return jwt.sign({ id }, "Trident secret", { expiresIn: age });
};

module.exports.signup = (req, res) => {
  console.log("Get Request");
  res.send("Sign Up");
};

module.exports.signuppost = async (req, res) => {
  const { username, email, password, isTeacher } = req.body;
  let profileImage = "";
  if (req.file) {
    profileImage = req.file.path;
  }
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (
      (await User.find({ username })).length > 0 ||
      (await User.find({ email })).length > 0
    ) {
      res.status(400).send("Account exits with same email or username");
    } else {
      const user = new User({
        userName:username,
        email:email,
        password: hashedPassword,
        isTeacher: isTeacher === 1 ? true : false,
        profileImage: profileImage,
      });
      await user.save();
      console.log(user);
      // const token = createToken(user.id);
      res.status(200).json({ ...user, token });

      // res.cookie("jwt", token, { httpOnly: true, maxAge: age * 1000 });
      // res.status(200).json({ ...user, jwt: token });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.login = (req, res) => {
  res.send("Log In");
};

module.exports.loginpost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(user);
    if (!user) {
      res.status(404).send("User Not Present");
    } else if (!validPassword) {
      res.status(404).send("Invalid Password");
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.logout = (req, res) => {
  res.send("Log Out");
};
