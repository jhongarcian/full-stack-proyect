// Utils functions 
require('dotenv').config();
const { setMainView, setNavs } = require('./utils/index.js')
const { getProducts, getProductsLimitFour } = require('./utils/products.js')
const { categorySection, titleSection, heroSection } = require('./utils/landingPage.js')
const { reformatSession } = require('./utils/stripe.js');
const { success } = require('./utils/success')
const pgp = require('pg-promise')();
const navs = require('./data/navs.json')
const querystring = require('querystring')
const url = require('url')

const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

const PORT = process.env.PORT || 5050;
const server = express();
const SECRET = process.env.SECRET;

server.use(express.json());
server.use(cookieParser())
server.use(sessions({ 
	secret: SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 30000 },
    resave: false
}));

const validCreds = {
	password: "1234",
    username: "John"
};

// style.css and main.js middleware
// server.use(express.static(__dirname + '/client-ui/public'))
server.use(express.static(__dirname + '/dist'))

// Es6Renderer setup
server.engine('html', es6Renderer);
server.set('views', 'views');
server.set('view engine', 'html');

// Stripe checkout
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// Post endpoint for stripe 
server.post('/create-checkout-session', async (req, res) => {
	const listOfProducts = await getProducts()
	try {
		
		const session = await stripe.checkout.sessions.create({
			// Credit Cards only
			payment_method_types: ['card'],
			// One time payment
			mode: 'payment',
			// items that we are adding with details inc from client req
			line_items: req.body.items.map(item => {
				// const storeItem = storeItems.get(item.id)
				const storeItem = listOfProducts.find(e => e.id === item.id);
				console.log(storeItem)
				return {
					price_data: {
						currency: 'usd',
						product_data: {
							name: storeItem.name
						},
						unit_amount: storeItem.priceincents,
					},
					quantity: item.quantity
				}
			}),
			// redirect urls 
			success_url:`${process.env.SERVER_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.SERVER_URL}`
		})
		// response url => stripe
		res.json({url: session.url});
	} catch (e) {
		res.status(500).json({ error: e.message})
	}
});

// Homepage endpoint
server.get('/',async (req, res) => {
	const products = await getProducts();
	const smartphones = await getProductsLimitFour('Smartphones');
	const tablets = await getProductsLimitFour('Tablets');
	const laptops = await getProductsLimitFour('Laptops');
	const keyboards = await getProductsLimitFour('Keyboards');

	res.render('index', {
		locals: {
			products,
			heroSection: heroSection(),
			smartphones: categorySection(smartphones, 'left'),
			tablets: categorySection(tablets, "right"),
			laptops: categorySection(laptops, 'left'),
			keyboards: categorySection(keyboards, "right"),
			titleSection: titleSection(),
			navs: setNavs(req.url, navs, !!req.session.userId)
		},
		partials: setMainView('landing')
	});
});

// Success endpoint
server.get('/success', async (req, res) => {
	// Return the id from the url params
	const urlSring = req.url;
	const parsedUrl = url.parse(urlSring);
	const queryString = parsedUrl.query;
	console.log(queryString)

	const queryParams = querystring.parse(queryString)
	const sessionId = queryParams.session_id;

	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		const items = await stripe.checkout.sessions.listLineItems(
			sessionId,
			{limit: 10 }
		)
		const sessionResult = reformatSession(session, items);
		res.render('index', {
			locals: {
				successHtml: success(sessionResult),
				navs: setNavs(req.url, navs, !!req.session.userId)
			},
			partials: setMainView(`success`)
		})
		return
	} catch (error) {
		console.error(error)
	}
});

// Health endpoint created.
server.get("/heartbeat", (req, res) => {
	res.json({"is":"working", "status":"good"});
});

server.get('/cart', (req, res) => {
	res.render('index', {
		locals: {
			navs: setNavs(req.url, navs, !!req.session.userId)
		},
		partials: setMainView('cart')
	});
});

server.get('/favorites', (req, res) => {
	res.render('index', {
		locals: {
			navs: setNavs(req.url, navs, !!req.session.userId)
		},
	  partials: setMainView('favorites')
	});
});

server.get('/products', async (req, res) => {
	const result = await getProducts()
	const mainView = setMainView('products')
	res.render('index', {
		locals: {
			navs: setNavs(req.url, navs, !!req.session.userID),
			title: result
		},
		partials: {
			result: 'partials/main/products',
			...mainView}
	});
});

server.get('/product-list', async (req, res) => {
	const products = await getProducts()
	res.json(products)
});

server.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

server.post("/login", (req, res) => {
    const afterLogin = {
        isAuthenticated: false,
        redirectTo: "/login"
    };

    const { password, username } = req.body;
    if(password === validCreds.password && username === validCreds.username){
        req.session.userId = username;
        afterLogin.isAuthenticated = true;
        afterLogin.redirectTo = "/profile";
    }
    res.json(afterLogin)
});

server.get("/login", (req, res) => {
    res.render("index", {
        locals: {
			navs: setNavs(req.url, navs, !!req.session.userId)
		},
        partials: setMainView("login")
    })
});

// Server PORT listening.
server.listen(PORT, () => {
	console.log(`The server is running at PORT ${PORT}`)
})

