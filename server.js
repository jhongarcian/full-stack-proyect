
// dotenv
require('dotenv').config();

// Express as a server.
const express = require('express');

//Es5Renderer
const es6Renderer = require('express-es6-template-engine')

// Running on port 8080.
const PORT = process.env.PORT || 5050;

// Server with express.
const server = express();

// Every endpoint with a json response.
server.use(express.json());

// style.css and main.js middleware
server.use(express.static(__dirname + '/client-ui/public'))

// Es6Renderer setup
server.engine('html', es6Renderer);
server.set('views', 'views');
server.set('view engine', 'html');

// Homepage endpoint
server.get('/', (req, res) => {
	res.render('index', { locals: {title: 'Welcome!'}})
})


// Stripe checkout
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// Store items 
const storeItems = new Map([
	[1, {priceInCents: 10000, name: 'Item 1'}],
	[2, {priceInCents: 20000, name: 'Item 2'}]
]);

// Post endpoint for stripe 
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

