const express = require('express');
const app = express();
const PORT = 8002;

let numberOfRequestsForUser = {};

// Reset request count every second
setInterval(() => {
  numberOfRequestsForUser = {};
}, 1000);


//global middleware
const rateLimiter = (req, res, next) => {
  const userId = req.headers['user-id']; // Correct header key

  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  if (numberOfRequestsForUser[userId]) {
    numberOfRequestsForUser[userId]++;
    if (numberOfRequestsForUser[userId] > 5) {
      return res.status(429).send("Too Many Requests! Try again later.");
    }
  } else {
    numberOfRequestsForUser[userId] = 1;
  }

  next();
};

app.use(rateLimiter);

app.get('/user', (req, res) => {
  console.log(numberOfRequestsForUser);
  res.status(200).json({ name: 'john' });
});

app.post('/user', (req, res) => {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/reqCount', (req, res) => {
  res.status(200).json({ reqCount: numberOfRequestsForUser });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
