const express = require('express')
const router = express.Router();



router.get('/read/usernames', (req, res) => {
  console.log("get")
  let usernames = req.users.map(function(user) {
    return {id: user.id, username: user.username};
  });
  res.send(usernames);
});


const getUserByUsername = function (req, res) {
  console.log("getUserByUsername");
  const username = req.params.name; // Get the username from request parameters
  const user = req.users.find(user => user.username === username); // Find user by username
  console.log(user);
  if (user) {
    req.userEmail = user.email; // Add user's email to request object
    return res.status(200).json(
      [{
        email: user.email
      }]
    )
  } else {
    return res.status(404).json({
      error: { message: 'User not found', status: 404 }
    });
  }
};

router.get('/read/username/:name', getUserByUsername);