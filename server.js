
// dotenv
require('dotenv').config();

// Express as a server.
const express = require('express');

// Running on port 8080.
const PORT = process.env.PORT || 5050;

// Server with express.
const server = express();

// Every endpoint with a json response.
server.use(express.json());
server.use(express.static(__dirname + '/client-ui'))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
	[1, {priceInCents: 10000, name: 'Item 1'}],
	[2, {priceInCents: 20000, name: 'Item 2'}]
]);

console.log(storeItems);
server.post('/create-checkout-session', async (req, res) => {
	try {
		const session = await stripe.checkout.sessions.create({
			// Credit Cards only
			payment_method_types: ['card'],
			// One time payment
			mode: 'payment',
			// items that we are adding with details inc from client req
			line_items: req.body.items.map(item => {
				const storeItem = storeItems.get(item.id)
				return {
					price_data: {
						currency: 'usd',
						product_data: {
							name: storeItem.name
						},
						unit_amount: storeItem.priceInCents
					},
					quantity: item.quantity
				}
			}),
			// redirect urls 
			success_url:`${process.env.SERVER_URL}/success.html`,
			cancel_url: `${process.env.SERVER_URL}/cancel.html`,
		})
		// response url => stripe
		res.json({url: session.url});
	} catch (e) {
		res.status(500).json({ error: e.message})
	}
})

// Health endpoint created.
server.get("/heartbeat", (req, res) => {
	res.json({"is":"working", "status":"good"});
});

// Server PORT listening.
server.listen(PORT, () => {
	console.log(`The server is running at PORT ${PORT}`)
})

