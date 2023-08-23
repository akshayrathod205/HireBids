const Provider = require("../models/Provider")

const getProvider = async (req, res)=>{
    try {
        const loggedInUserID = req.user.payload.userid
        const loggedInUser = await Provider.findOne({_id: loggedInUserID})
        res.status(200).json(loggedInUser)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProvider
}