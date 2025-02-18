import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

import productRoutes from './routes/productRoutes.js'
import { sql } from './config/db.js';
import { aj } from './lib/arcjet.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
app.use(helmet({ contentSecurityPolicy: false, })); //middleware de seguridad
app.use(cors()); //permite la coneccion de back y fron en diferentes dominios
app.use(morgan('dev'));// hace logs de los requests que hagamos
app.use(express.json()); //convertira el cuerpo dela solicutid req.body de estar en JSON a on objeto js para manejarlo enel backend



//Aplicando arcjet a todas las routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, //especifica que cada solicitud consume 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: 'To many requests' });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: 'Bot access denied' });
      } else {
        res.status(403).json({ error: 'Forbidden' });
      };
      return;
    };

    //verificamos si es un bot suplantado
    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      res.status(403).json({ error: 'Spoofed bot detected' });
      return;
    }

    next()
  } catch (error) {
    console.log("Arcjet error: ", error);
    next(error);
  }
});

app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === "production") {
  //server our react app
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
};

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Error initDB: ', error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log('El servidor se esta ejecutando en el puerto ' + PORT)
  })
})


