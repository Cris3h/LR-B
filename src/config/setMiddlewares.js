const morgan = require("morgan");
const cors = require("cors");
const { json } = require("express");
const { CORS_ORIGIN } = require("./envs");

module.exports = (server) => {
   server.use(json());
   if (CORS_ORIGIN && String(CORS_ORIGIN).trim()) {
      const origins = String(CORS_ORIGIN)
         .split(",")
         .map((s) => s.trim())
         .filter(Boolean);
      server.use(
         cors({
            origin: origins.length === 1 ? origins[0] : origins,
         })
      );
   } else {
      server.use(cors());
   }
   server.use(morgan("dev"));
};