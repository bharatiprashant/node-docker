const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = await User.create({
      username: username,
      password: hashPassword,
    });

    res.status(201).json({
      status: "success yeaahha",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    console.log(user);
    if (user) {
      const isCorrect = await bcrypt.compare(password, user.password);
      if (isCorrect) {
        console.log("is correct");
        res.status(200).json({
          status: "success waggas sdfsdfaaaaa",
        });
      } else {
        res.status(400).json({
          status: "fail",
          message: "incorrect username or password",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
