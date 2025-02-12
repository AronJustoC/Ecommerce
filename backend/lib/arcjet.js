import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";

import 'dotenv/config.js';

//init arcjet
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ['ip.src'],
  rules: [
    //escudo que proteje a la aplicacion de ataques comunes ej. SQL injection, XSS, CRSF attacks
    shield({ mode: 'LIVE' }),
    detectBot({
      mode: 'LIVE',
      allow: ['CATEGORY:SEARCH_ENGINE'],
      //Puedes ver toda la lista en https://arcjet.com/bot—list
    }),
    //Limitacion de peticiones o de tasa (evita ataques de DoS)
    tokenBucket({
      mode: 'LIVE',
      refillRate: 5,
      interval: 10,
      capacity: 10,
    })
  ],
}) 
