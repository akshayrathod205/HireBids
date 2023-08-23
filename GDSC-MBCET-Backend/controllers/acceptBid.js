const Consumer = require("../models/Consumer");

const acceptBid = async (req, res) => {
    try {
      const { ticketID, bidID } = req.params;
      console.log(ticketID)
      const loggedInUserID = req.user.payload.userid;
      const loggedInUser = await Consumer.findOne({ _id: loggedInUserID });
      const acceptedTicket = loggedInUser.currentTickets.find(
        (ticket) => ticket._id.toString() === ticketID
      );
  
      if (acceptedTicket) {
        acceptedTicket.phone = acceptedTicket.bids[0].contact
        loggedInUser.pastWorks.push(acceptedTicket);
        loggedInUser.currentTickets = loggedInUser.currentTickets.filter(
          (ticket) => ticket._id.toString() !== ticketID
        );
        await loggedInUser.save();
  
        res.status(200).json({ message: "Bid accepted successfully" });
      } else {
        res.status(404).json({ message: "Ticket not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    acceptBid,
  };
  