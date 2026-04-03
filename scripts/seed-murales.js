/**
 * Crea 15 registros de obra en MongoDB vía POST /artwork
 *
 * Uso:
 *   cd server
 *   node scripts/seed-murales.js
 *
 * Variables (opcional, por defecto localhost):
 *   API_URL=http://localhost:3001
 *
 * Requiere: servidor corriendo, MONGO_URI válido, sin auth en POST (actual).
 */

require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const axios = require("axios");

const API_URL = (process.env.API_URL || "http://localhost:3001").replace(/\/$/, "");
const COUNT = 15;

const ciudades = [
  { city: "Buenos Aires", state: "CABA", lat: -34.6037, lng: -58.3816 },
  { city: "Córdoba", state: "Córdoba", lat: -31.4201, lng: -64.1888 },
  { city: "Rosario", state: "Santa Fe", lat: -32.9442, lng: -60.6505 },
  { city: "Mendoza", state: "Mendoza", lat: -32.8895, lng: -68.8458 },
  { city: "La Plata", state: "Buenos Aires", lat: -34.9215, lng: -57.9545 },
  { city: "Mar del Plata", state: "Buenos Aires", lat: -38.0055, lng: -57.5426 },
  { city: "Salta", state: "Salta", lat: -24.7821, lng: -65.4232 },
  { city: "Tucumán", state: "Tucumán", lat: -26.8083, lng: -65.2176 },
  { city: "Neuquén", state: "Neuquén", lat: -38.9516, lng: -68.0591 },
  { city: "Paraná", state: "Entre Ríos", lat: -31.7333, lng: -60.5294 },
  { city: "San Miguel de Tucumán", state: "Tucumán", lat: -26.8241, lng: -65.2226 },
  { city: "Bahía Blanca", state: "Buenos Aires", lat: -38.7183, lng: -62.2663 },
  { city: "Resistencia", state: "Chaco", lat: -27.4511, lng: -58.9867 },
  { city: "Posadas", state: "Misiones", lat: -27.3621, lng: -55.8968 },
  { city: "Bariloche", state: "Río Negro", lat: -41.1335, lng: -71.3103 },
];

function jitter(lat, lng, i) {
  const d = 0.04 + (i % 5) * 0.01;
  return [
    lat + (Math.sin(i * 1.7) * d) / 2,
    lng + (Math.cos(i * 1.3) * d) / 2,
  ];
}

function buildPayload(i) {
  const c = ciudades[i % ciudades.length];
  const [lat, lng] = jitter(c.lat, c.lng, i);
  const n = i + 1;
  return {
    name: `Historia ${n} — ${c.city}`,
    image: `https://picsum.photos/seed/listonrosa${n}/800/600`,
    description: `Relato de concientización sobre el cáncer de mama y el acompañamiento en la vía pública. Mural ${n}: un fragmento de historia en ${c.city}, ${c.state}.`,
    place: { city: c.city, state: c.state },
    coordinates: [lat, lng],
  };
}

async function main() {
  console.log(`API: ${API_URL}`);

  let ok = 0;
  let fail = 0;

  for (let i = 0; i < COUNT; i++) {
    const body = buildPayload(i);
    try {
      const res = await axios.post(`${API_URL}/artwork`, body, {
        headers: { "Content-Type": "application/json" },
        validateStatus: () => true,
      });
      const data = res.data;
      const success =
        res.status === 200 && data && data.error === false && data.data;
      if (!success) {
        console.error(`[${i + 1}/${COUNT}] FAIL`, body.name, res.status, data);
        fail++;
      } else {
        console.log(`[${i + 1}/${COUNT}] OK`, body.name);
        ok++;
      }
    } catch (e) {
      console.error(`[${i + 1}/${COUNT}] ERROR`, e.message);
      fail++;
    }
  }

  console.log(`\nListo: ${ok} creados, ${fail} fallidos.`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
