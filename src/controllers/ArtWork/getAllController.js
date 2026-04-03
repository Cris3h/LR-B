const database = require("../../schemas/index");
const { getAllArtWork } = require("../../services");
const { response } = require("../../utils");

const getAll = async (req, res) => {
   const artWorks = await getAllArtWork();
   response(res, 200, artWorks);
}

module.exports = getAll;