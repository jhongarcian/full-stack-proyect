const pgp = require('pg-promise')();
require('dotenv').config();

const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.PRODUCTS_DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    allowExitOnIdle: process.env.DB_ALLOWEXITONIDLE 
};

const db = pgp(cn);

async function getProducts() {
    const products = await db.any('SELECT * FROM stock', [true]);
    return products;
};

// async function getProductsLimitFour() {
//     const products = await db.any('SELECT * FROM stock WHERE category = Electronics LIMIT 4;');
//     return products

// }

module.exports = { getProducts }