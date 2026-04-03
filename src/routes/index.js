const { Router } = require("express");
const { getAllArtWorks, createArtWorks, createComments, getAllComments, getOneArtWork } = require("../controllers");
const middleWare = require("../middlewares/index");

const router = Router();

router.get("/artwork", getAllArtWorks);
router.get('/artwork/:id', middleWare.ArtWorkValidationId, getOneArtWork);
router.get('/comment', getAllComments);

router.post('/artwork', middleWare.ArtWorkValidation, createArtWorks);
router.post(
  '/comment/:id',
  middleWare.requireInternalCommentKey,
  middleWare.CommentValidation,
  middleWare.CommentValidationId,
  createComments
);



module.exports = router;
