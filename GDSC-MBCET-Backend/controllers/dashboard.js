const Provider = require("../models/Provider");
const Consumer = require("../models/Consumer");

const dashboardProvider = async (req, res) => {
  try {
    let sumStars = 0;
    const loggedInUserID = req.user.payload.userid;
    const loggedInUser = await Provider.findOne({ _id: loggedInUserID });
    console.log(loggedInUser);
    loggedInUser.reviews.forEach((review) => {
      sumStars = sumStars + review.stars;
    });
    const averageStars = sumStars / loggedInUser.reviews.length;
    const reviews = loggedInUser.reviews.length;
    const pastJobs = loggedInUser.pastWorks.length;
    const openTickets = loggedInUser.openTickets;
    const pastWorks = loggedInUser.pastWorks;
    const name = loggedInUser.firstName + " " + loggedInUser.lastName
    res.status(200).json({
      averageStars: averageStars,
      reviews: reviews,
      pastJobs: pastJobs,
      openTickets: openTickets,
      pastWorks: pastWorks,
      name: name
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const dashboardConsumer = async (req, res) => {
  try {
    const loggedInUserID = req.user.payload.userid;
    const loggedInUser = await Consumer.findOne({ _id: loggedInUserID });
    console.log(loggedInUser);
    const activeBidslen = loggedInUser.currentTickets.length;
    const activeBids = loggedInUser.currentTickets;
    const pastJobs = loggedInUser.pastWorks;
    const activeTickets = loggedInUser.currentTickets;
    const points = loggedInUser.points;
    res.status(200).json({
      activeBids: activeBids,
      pastJobs: pastJobs,
      activeTickets: activeTickets,
      activeBidslen: activeBidslen,
      points: points,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  dashboardProvider,
  dashboardConsumer,
};
