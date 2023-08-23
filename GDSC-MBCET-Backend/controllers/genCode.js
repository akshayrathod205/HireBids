const Consumer = require("../models/Consumer")
const Provider = require("../models/Provider")

const generateCode = async (req, res) => {
    try {
      const { code } = req.body;
      console.log(code)
      const loggedInUserID = req.user.payload.userid;
      let loggedInUser = await Consumer.findByIdAndUpdate(loggedInUserID, { code: code });
      
      if (loggedInUser === null) {
        loggedInUser = await Provider.findByIdAndUpdate(loggedInUserID, { code: code });
      }
      
      res.status(200).json({ message: "Code added successfully!", loggedInUser });
    } catch (error) {
      console.log(error);
    }
  };
  
  module.exports = {
    generateCode,
  };
  