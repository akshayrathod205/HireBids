const Consumer = require("../models/Consumer")

const getConsumer = async (req, res)=>{
    try {
        const loggedInUserID = req.user.payload.userid
        const loggedInUser = await Consumer.findOne({_id: loggedInUserID})
        res.status(200).json(loggedInUser)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getConsumer
}