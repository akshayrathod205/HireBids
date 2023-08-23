const Provider = require("../models/Provider");
const Consumer = require("../models/Consumer");

const providerSignup = async (req, res) => {
  try {
    let userPoints = 0;
    const {
      firstName,
      lastName,
      age,
      IDProof,
      gender,
      qualification,
      experience,
      phone,
      profilePicture,
      email,
      username,
      password,
      code,
    } = req.body;
    const existingUser = await Provider.findOne({ username: username });
    if (!existingUser) {
      if (code) {
        const allUsers = await Provider.find({});
        const refUser = allUsers.find((user) => user.code === code); // Use `.find()` instead of `.filter()`
        if (refUser) {
          console.log(refUser);
          refUser.points = refUser.points + 50;
          await refUser.save(); // Save the updated refUser document
          userPoints = 50;
        }
      }

      const user = await Provider.create({
        firstName: firstName,
        lastName: lastName,
        age: age,
        IDProof: IDProof,
        gender: gender,
        qualification: qualification,
        experience: experience,
        phone: phone,
        profilePicture: profilePicture,
        username: username,
        email: email,
        password: password,
        points: userPoints,
      });

      res.status(200).json({ message: "User created", user: user });
    } else {
      res.status(409).json({ message: "User already exists!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const providerLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const loggedInUser = await Provider.findOne({ username: username });
    if (loggedInUser) {
      const isCorrect = await loggedInUser.comparePassword(password);

      if (isCorrect) {
        const token = loggedInUser.createJWT();
        res.status(200).json({
          msg: "User Logged In Successfully!",
          token: token,
          user: loggedInUser,
        });
      } else {
        res.status(401).json({ error: "Invalid Password" });
      }
    } else {
      res.status(400).json({ msg: "No such user exists!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const consumerSignup = async (req, res) => {
  try {
    let userPoints = 0;
    const {
      firstName,
      lastName,
      age,
      phone,
      username,
      email,
      password,
      profilePicture,
      code,
    } = req.body;
    const existingUser = await Consumer.findOne({ username: username });
    if (!existingUser) {
      const allUsers = await Consumer.find({});
      const refUser = allUsers.find((user) => user.code === code); // Use `.find()` instead of `.forEach()`
      if (refUser) {
        console.log(refUser);
        refUser.points = refUser.points + 50;
        await refUser.save();
        userPoints = 50;
      }
      const user = await Consumer.create({
        firstName: firstName,
        lastName: lastName,
        age: age,
        phone: phone,
        username: username,
        email: email,
        password: password,
        profilePicture: profilePicture,
        points: userPoints,
      });

      res.status(200).json({ message: "User created", user: user });
    } else {
      res.status(409).json({ message: "User already exists!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const consumerLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const loggedInUser = await Consumer.findOne({ username: username });
    if (loggedInUser) {
      const isCorrect = await loggedInUser.comparePassword(password);

      if (isCorrect) {
        const token = loggedInUser.createJWT();
        res.status(200).json({
          msg: "User Logged In Successfully!",
          token: token,
          user: loggedInUser,
        });
      } else {
        res.status(401).json({ error: "Invalid Password" });
      }
    } else {
      res.status(400).json({ msg: "No such user exists!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  providerSignup,
  providerLogin,
  consumerSignup,
  consumerLogin,
};
