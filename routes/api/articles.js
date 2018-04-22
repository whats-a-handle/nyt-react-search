const router = require("express").Router();
const articleController = require("../../controllers/articleController");
const nytController = require('../../controllers/nytController')
// Matches with "/api/books"

router.route("/api/search").post(nytController.searchArticle);


router.route("/")
  .get(articleController.findAll)
  .post(articleController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(articleController.findById)
  .put(articleController.update)
  .delete(articleController.remove);

  

module.exports = router;
