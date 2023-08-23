const Consumer = require("../models/Consumer");

const seeBids = async (req, res) => {
  try {
    const ticketID = req.params.ticketID;
    const loggedInUserID = req.user.payload.userid;
    const loggedInUser = await Consumer.findOne({ _id: loggedInUserID });
    console.log(loggedInUser);
    const ticket = loggedInUser.currentTickets.find((ticket) => {
      return ticket._id.toString() === ticketID;
    });
    console.log(ticket);

    const bids = ticket ? ticket.bids : [];
    res.status(200).json(bids);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  seeBids,
};
