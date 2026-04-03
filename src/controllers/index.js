const { catchedAsync } = require("../utils");


module.exports = {
   getAllArtWorks: catchedAsync(require("./ArtWork/getAllController")),
   createArtWorks: catchedAsync(require("./ArtWork/createController")),
   getAllComments: catchedAsync(require("./Comment/getAllController")),
   createComments: catchedAsync(require("./Comment/createController")),
   getOneArtWork: catchedAsync(require("./ArtWork/getOneController")),
};
