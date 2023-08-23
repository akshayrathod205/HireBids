const Consumer = require("../models/Consumer");
const Ticket = require("../models/Ticket");

const raiseTicket = async (req, res) => {
  try {
    const { workerType, date, description, problemImage, address } = req.body;
    const loggedInUserID = req.user.payload.userid;
    const loggedInUser = await Consumer.findOne({ _id: loggedInUserID });
    
    const ticket = new Ticket({
      workerType: workerType,
      date: date,
      description: description,
      problemImage: problemImage,
      address: address
    });

    // Save the ticket to the database
    await ticket.save();

    // Add the ticket reference to the logged-in user's currentTickets array
    loggedInUser.currentTickets.push(ticket);
    await loggedInUser.save();

    // Return the created ticket or a success message
    res.status(200).json({ message: "Ticket raised successfully", ticket: ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while raising the ticket" });
  }
};

module.exports = {
  raiseTicket,
};
