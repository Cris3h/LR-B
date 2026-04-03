const database = require("../../schemas/index");
const { getOneArtWork } = require("../../services");
const { response } = require("../../utils");

const getOne = async (req, res) => {
   const { id } = req.params;
   const artWork = await getOneArtWork(id);
   response(res, 200, artWork);
}
module.exports = getOne;
