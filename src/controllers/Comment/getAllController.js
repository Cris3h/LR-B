const { getAllComment } = require("../../services");
const { response } = require("../../utils");

const getAll = async (req, res) => {
   const comment = await getAllComment();
   response(res, 200, comment);
}

module.exports = getAll;