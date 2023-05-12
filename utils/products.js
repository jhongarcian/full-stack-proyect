const pgp = require('pg-promise')({ capSQL: true });
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

async function getProductsLimit20( offnum) {
    const products = await db.any(`SELECT category,id ,name, priceincents, image_url_one, image_url_two FROM stock LIMIT 20 OFFSET ${offnum};`);
    return products
}

async function getFavoriteProducts(product_id) {
    const products = await db.any(`SELECT * FROM stock WHERE id = ${product_id}`, [true]);
    return products;
};

async function getProductsLimitFour(name) {
    const products = await db.any(`SELECT category, id, name, priceincents, image_url_one, image_url_two FROM stock WHERE category = '${name}' LIMIT 4;`);
    return products

}
async function addOrderToDataBase(order, id_generated) {
    const id_number = id_generated;

    const {customerName, customerEmail, subTotalAmount, totalAmount, date_created, items} = order;
    // sums all the quantities of the array
    let quantitySum = 0;
    const quantity = items.forEach(element => {
        quantitySum += element.quantity;
    });
    // orders table with the customer information.
    const orders = await db.any(`INSERT INTO orders (id,customer_name, customer_email, subtotal_amount, total_amount, item_count,purchase_date) VALUES ('${id_number}' ,'${customerName}', '${customerEmail}', ${subTotalAmount}, ${totalAmount}, ${quantitySum}, '${date_created}');`);
    console.log(orders + "orders")
    // order items information
    const orderItems = async () => {
        return Promise.all(items.map(item => doOrderItems(item, date_created, id_number)))
    }
    await orderItems()

    return
}

async function doOrderItems(item, date_created, id_number) {
    const { amount, currency, itemName, itemPrice, quantity } = item
    const order_items = await db.any(`INSERT INTO order_items (order_id, item_name, item_price, quantity, amount, purchase_date) VALUES ('${id_number}', '${itemName}', ${itemPrice}, ${quantity}, ${amount}, '${date_created}');`);
}

async function ordersCount() {
    const orders = (await db.any('SELECT COUNT(id) FROM orders;')).map(e => e.count)[0];
    const sales = (await db.any('SELECT total_amount FROM orders;')).reduce((prev, current) => ({ total_amount: prev.total_amount + current.total_amount }), { total_amount: 0 }).total_amount;
    return {orders, sales}
}
module.exports = { getProducts, getProductsLimitFour,addOrderToDataBase, ordersCount, getFavs, addToFavs, getFavoriteProducts, getProductsLimit20, db }
