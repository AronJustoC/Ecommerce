import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import productRoutes from './routes/productRoutes.js'
import { sql } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet()); //middleware de seguridad
app.use(cors()); //permite la coneccion de back y fron en diferentes dominios
app.use(morgan('dev'));// hace logs de los requests que hagamos
app.use(express.json()); //convertira el cuerpo dela solicutid req.body de estar en JSON a on objeto js para manejarlo enel backend

app.use('/api/products', productRoutes);

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


