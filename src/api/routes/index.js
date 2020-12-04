const router = require('express').Router;

// Importing our routes.

// All Profile-related routes
import retrieveProfile from "./profile/retrieveProfile.js";

router.get('/:id', (req, res) => {
  retrieveProfile.then((response) => {
    res.end(JSON.stringify(response));
  }).catch((error) => {
    res.status(error.status == null ? 500 : error.status).end(JSON.stringify(error));
  });
});

export default router;