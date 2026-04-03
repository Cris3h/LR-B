const database = require("../../schemas/index");
const { createComment } = require("../../services");
const { response } = require("../../utils");


const create = async (req, res) => {
   const { id } = req.params; //artwork
   const { user, title, body, picture } = req.body; // comment
   const obj = { user, title, body, picture };

   const newComment = await createComment(id, obj)
   response(res, 200, newComment);
}

module.exports = create;