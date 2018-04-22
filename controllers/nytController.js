const db = require("../models");

// Defining methods for the booksController
module.exports = {
  
  searchArticle: function(req, res) {
    console.log(req.body);
    res.json(req.body);
  }
  
};
