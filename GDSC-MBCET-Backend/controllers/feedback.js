const Consumer = require("../models/Consumer");
const Provider = require("../models/Provider");

const givefeedback = async (req, res) => {
  try {
    const { feedback, stars, phone } = req.body;
    const loggedInUserID = req.user.payload.loggedInUserID;
    const loggedInUser = await Consumer.findOne({ _id: loggedInUserID });
    const provider = await Provider.findOne({ phone: phone });
    console.log(provider);

    const revieww = {
      review: feedback,
      stars: stars,
    };
    provider.reviews.push(revieww);
    console.log(provider);
    await provider.save();
    res.status(200).json({ message: "Review added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  givefeedback,
};
