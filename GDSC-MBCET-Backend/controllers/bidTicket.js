const Provider = require("../models/Provider");
const Consumer = require("../models/Consumer");

const bid = async (req, res) => {
  try {
    let feedbackArray = [];
    let sumStars = 0;
    const { amount } = req.body;
    const consumerID = req.params.consumerID;
    const loggedInUserID = req.user.payload.userid;
    console.log(loggedInUserID);
    const loggedInUser = await Provider.findOne({ _id: loggedInUserID });
    console.log(loggedInUser);
    const consumer = await Consumer.findOne({ _id: consumerID });
    const ticketID = req.params.ticketID;

    if (!ticketID) {
      return res.status(400).json({ error: "Ticket ID is required" });
    }

    // Find the specific ticket in the consumer's currentTickets array
    const ticket = consumer.currentTickets.find(
      (ticket) => ticket._id.toString() === ticketID
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    loggedInUser.reviews.forEach((review) => {
      sumStars = sumStars + review.stars;
      feedbackArray.push(review.review);
    });
    const rating = sumStars / loggedInUser.reviews.length;

    const actualBid = {
      amount: amount,
      bidder: loggedInUser.firstName + " " + loggedInUser.lastName,
      email: loggedInUser.email,
      experience: loggedInUser.experience + " years",
      contact: loggedInUser.phone,
      rating: rating,
      feedback: feedbackArray,
    };

    const tickett = {
      name: consumer.firstName + " " + consumer.lastName,
      workerType: "Plumber",
      date: "2023-07-05",
      amount: "400",
      address: "Dedhia Niwas, Wadala, Mumbai",
    };

    ticket.bids.push(actualBid);
    loggedInUser.openTickets.push(tickett);
    await loggedInUser.save();

    await Consumer.findByIdAndUpdate(consumer._id, consumer);
    console.log(consumer.currentTickets[0]);

    res.status(200).json({ message: "Bid submitted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  bid,
};
