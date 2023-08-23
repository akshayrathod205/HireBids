const Consumer = require("../models/Consumer");

const jobs = async (req, res) => {
  try {
    const { location, job, sort } = req.query;
    const queryObject = {};

    if (location) {
      queryObject.location = location;
    }
    if (job) {
      queryObject.job = { $regex: job, $options: "i" };
    }

    const allCustomers = await Consumer.find({});
    const filteredJobs = [];

    allCustomers.forEach((customer) => {
      const matchedJobs = customer.currentTickets.filter((ticket) => {
        // Apply your filters from the queryObject
        let match = true;
        if (queryObject.location) {
          match = match && ticket.location === queryObject.location;
        }
        if (queryObject.job) {
          match = match && ticket.workerType === queryObject.job.$regex;
        }
        // Add more conditions as needed for other fields in the queryObject
        return match;
      });

      // Add the matched jobs to the filteredJobs array
      filteredJobs.push(...matchedJobs.map((job) => ({
        ...job,
        user: customer
      })));
    });

    // Sort the filtered jobs
    if (sort) {
      const sortList = sort.split(",");
      filteredJobs.sort((a, b) => {
        for (let i = 0; i < sortList.length; i++) {
          const field = sortList[i].replace("-", "");
          const order = sortList[i].startsWith("-") ? -1 : 1;

          if (a[field] < b[field]) return -1 * order;
          if (a[field] > b[field]) return 1 * order;
        }
        return 0;
      });
    } else {
      filteredJobs.sort((a, b) => {
        if (a.createdAt < b.createdAt) return -1;
        if (a.createdAt > b.createdAt) return 1;
        return 0;
      });
    }

    res.status(200).json({ jobs: filteredJobs, nbHits: filteredJobs.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  jobs,
};
