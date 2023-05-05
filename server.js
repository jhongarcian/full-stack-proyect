// Utils functions 
const { setMainView, setNavs } = require('./utils/index.js')
const { getProducts, getProductsLimitFour } = require('./utils/products.js')
const pgp = require('pg-promise')();
const navs = require('./data/navs.json')

require('dotenv').config();
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

// Store items 
const storeItems = new Map([
	[1, {priceInCents: 10000, name: 'Item 1', images: ["https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg"]}],
	[2, {priceInCents: 20000, name: 'Item 2', images: ['https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg']}]
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
							name: storeItem.name,
							images: storeItem.images
						},
						unit_amount: storeItem.priceInCents,
					},
					quantity: item.quantity
				}
			}),
			// redirect urls 
			success_url:`${process.env.SERVER_URL}/success`,
			cancel_url: `${process.env.SERVER_URL}/cancel`,
		})
		// response url => stripe
		res.json({url: session.url});
	} catch (e) {
		res.status(500).json({ error: e.message})
	}
});

// Homepage endpoint
server.get('/',async (req, res) => {
	const products = await getProducts()
	const fourProducts = await getProductsLimitFour('Electronics')
	console.log(fourProducts)
	res.render('index', {
		locals: {
			products,
			fourProducts,
			navs: setNavs(req.url, navs, !!req.session.userId)
		},
		partials: setMainView('landing')
	})
});

// Success endpoint
server.get('/success', (req, res) => {
	res.render('index')
	// Need to create a the partials 
});

// Health endpoint created.
server.get("/heartbeat", (req, res) => {
	res.json({"is":"working", "status":"good"});
});

// Example => set our /view
// server.get('/fileName', (req, res) => {
// 	res.render('index', {
// 	  partials: setMainView('fileName')
// 	});
// });
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

