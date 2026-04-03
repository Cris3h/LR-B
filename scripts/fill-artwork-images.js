/**
 * Asigna entre 6 y 8 URLs de imagen a cada obra (array `images`) para probar el carrusel.
 *
 * Uso:
 *   cd server
 *   node scripts/fill-artwork-images.js
 *
 * Requiere: MONGO_URI en .env (misma base que la API).
 */

require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const artWorkSchema = require("../src/schemas/artWorkSchema");

const MONGO_URI = process.env.MONGO_URI;

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/**
 * @param {import("mongoose").Types.ObjectId} docId
 * @param {number} count
 */
function buildImageUrls(docId, count) {
  const idPart = String(docId).replace(/[^a-f0-9]/gi, "").slice(-12) || "mural";
  return Array.from({ length: count }, (_, i) =>
    `https://picsum.photos/seed/lr-${idPart}-slide${i}/800/600`
  );
}

async function main() {
  if (!MONGO_URI) {
    console.error("Falta MONGO_URI en server/.env");
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI);
  const ArtWork = mongoose.model("ArtWork", artWorkSchema);

  const docs = await ArtWork.find({});
  if (docs.length === 0) {
    console.log("No hay obras en la base. Cargá datos primero (p. ej. seed:murales).");
    await mongoose.disconnect();
    process.exit(0);
  }

  let updated = 0;
  for (const doc of docs) {
    const n = randomInt(6, 8);
    const images = buildImageUrls(doc._id, n);
    doc.images = images;
    doc.image = undefined;
    await doc.save();
    updated++;
    console.log(`OK  (${n} imgs) ${doc.name || doc._id}`);
  }

  console.log(`\nListo: ${updated} obra(s) con 6–8 imágenes cada una.`);
  await mongoose.disconnect();
}

main().catch(async (e) => {
  console.error(e);
  try {
    await mongoose.disconnect();
  } catch (_) {
    /* ignore */
  }
  process.exit(1);
});
