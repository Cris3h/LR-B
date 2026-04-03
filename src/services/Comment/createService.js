const database = require("../../schemas/index");

const create = async (id,obj) => {
   const { user, title, body } = obj;
   const artWork = await database.ArtWork.findById(id);
   const newComment = new database.Comment({
      user,
      title,
      body,
      artwork_id: artWork._id,
   });
   await newComment.save();
   artWork.comments = artWork.comments.concat(newComment._id);
   await artWork.save();
   return newComment;
};

module.exports = create;