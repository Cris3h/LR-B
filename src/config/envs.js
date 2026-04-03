require('dotenv').config();

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 3001,
    /** Coma-separado, ej: http://localhost:3000,https://tudominio.com */
    CORS_ORIGIN: process.env.CORS_ORIGIN,
};