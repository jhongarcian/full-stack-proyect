// Utils functions 
require('dotenv').config();
const { setMainView, setNavs, generateId, getVisitorsCount, insertNewUserInDataBase, getPasswordFromDataBase, checkSession } = require('./utils/index.js')
const { getProducts, getProductsLimitFour, addOrderToDataBase, ordersCount, db, orderInDataBase, getFavs, addToFavs, getFavoriteProducts, getProductsLimit20, addNewProduct, getOrdersHistory } = require('./utils/products.js')
const { categorySection, titleSection, heroSection } = require('./utils/landingPage.js')
const { reformatSession } = require('./utils/stripe.js');
const { success } = require('./utils/success')
const navs = require('./data/navs.json')
const querystring = require('querystring')
const url = require('url')

const express = require('express');
const bycrypt = require('bcrypt')
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

const account_types = {
	admin: 'admin',
	customer: 'customer',
	guest: 'guest'
}

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
server.get('/', async (req, res) => {
	const products = await getProducts();
	const smartphones = await getProductsLimitFour('smartphone');
	const tablets = await getProductsLimitFour('tablet');
	const laptops = await getProductsLimitFour('laptop');
	const keyboards = await getProductsLimitFour('keyboards');
	if(!req.cookies.visited){
		await db.any('INSERT INTO visitors DEFAULT VALUES;');
		res.cookie('visited', true, { maxAge:86400000 });
	}

	res.render('index', {
		locals: {
			products,
			heroSection: heroSection(),
			smartphones: categorySection(smartphones, 'left'),
			tablets: categorySection(tablets, "right"),
			laptops: categorySection(laptops, 'left'),
			keyboards: categorySection(keyboards, "right"),
			titleSection: titleSection(),
			navs: setNavs(req.url, navs, !!req.session.userId , user = "guest", account_types.guest)
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
	const queryParams = querystring.parse(queryString)
	const sessionId = queryParams.session_id;
	const order = await orderInDataBase(sessionId)
	
	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		const items = await stripe.checkout.sessions.listLineItems(
			sessionId,
			{limit: 10 }
		)
		const sessionResult = reformatSession(session, items);
		if(order){
			res.redirect('/')
			return
		}else {
			addOrderToDataBase(sessionResult, sessionId)
		}

		res.render('index', {
			locals: {
				successHtml: success(sessionResult),
				navs: setNavs(req.url, navs, !!req.session.userId , user = 'guest', account_types.guest)
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
			navs: setNavs(req.url, navs, !!req.session.userId , user = "guest", account_types.guest)
		},
		partials: setMainView('cart')
	});
});

server.post("/addToFavorites", async (req, res) => {
  const { user_id, products_id } = req.body;
  const newFav = await addToFavs(user_id, products_id);
  res.send(newFav);
});

server.get('/favorites', (req, res) => {
	res.render('index', {
		locals: {
			navs: setNavs(req.url, navs, !!req.session.userId , user = "guest", account_types.guest)
		},
	  partials: setMainView('favorites')
	});
});

server.get('/sucess', (req,res) => {
	res.render('index', {
		locals: {
			successHtml: success(sessionResult),
			navs: setNavs(req.url, navs, !!req.session.userId , user = "guest", account_types.guest)
		},
		partials: setMainView(`success`)
	});
});

server.get("/products", async (req, res) => {
  let {offnum} = req.headers
  if (offnum === undefined || offnum === null) {
	offnum = 0
  }  
  const result = await getProductsLimit20(offnum);
  console.log(result)
  res.render("index", {
    locals: {
      navs: setNavs(req.url, navs, !!req.session.userID),
      products: result,
    },
    partials: setMainView(`products`),
  });
});	

/* This code is creating a route for the server to handle GET requests to "/products/:id", where ":id"
is a dynamic parameter that can be any value. When a request is made to this endpoint, the server
retrieves the value of the "id" parameter from the request object using "req.params.id". It then
calls the "getProducts" function to retrieve a list of all products, and uses the "find" method to
search for the product with the matching ID. The resulting product object is then passed to the
"index" template using the "res.render" method, along with the navigation links and the name of the
"singleproduct" partial view. */
server.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await getProducts();
  const result = product.find((e) => {
    return e.id == id;
  });
  console.log('hello',result);
  res.render("index", {
    locals: {
      navs: setNavs(req.url, navs, !!req.session.userID),
      product: result,
    },
    partials: setMainView(`singleproduct`),
  });
});

server.get("/products/page/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await getProducts();
  const result = product.find((e) => {
    return e.id == id;
  });
  console.log(result);
  res.render("index", {
    locals: {
      navs: setNavs(req.url, navs, !!req.session.userID),
      product: result,
    },
    partials: setMainView(`singleproduct`),
  });
});

server.get("/products/page/:start", async (req, res) => {
  const start = req.params.start;
  const products = await getProductsLimit20(start);
  console.log(products);
  res.render("index", {
    locals: {
      navs: setNavs(req.url, navs, !!req.session.userID),
      products
    },
    partials: setMainView(`products`),
  });
});

server.get('/product-list', async (req, res) => {
	const products = await getProducts()
	res.json(products)
});

server.get("/logout", (req, res) => {
	const user_session = req.session.userId;
	console.log('From logout endpoint',user_session)
    req.session.destroy();
	res.clearCookie(user_session);
    res.redirect("/");
});

server.post("/login", async (req, res) => {
    const afterLogin = {
        isAuthenticated: false,
        redirectTo: "/login",
		current_data: ''
    };

    const { password, username } = req.body;

	const database_info = await getPasswordFromDataBase(username);

	const isValid = await bycrypt.compare(password, database_info.password);
	
	const account_type = database_info.account_type;

    if(isValid && account_type === account_types.admin){
        req.session.userId = username;
        afterLogin.isAuthenticated = true;
        afterLogin.redirectTo = `/dashboard/admin/${username}`;
    }
	if(isValid && account_type === account_types.customer){
		req.session.userId = username;
		afterLogin.isAuthenticated = false
		afterLogin.redirectTo = `/account/user/${username}`
		afterLogin.current_data = "is an user"
	}
    res.json(afterLogin)
});

server.get("/login", (req, res) => {
    res.render("index", {
        locals: {
			navs: setNavs(req.url, navs, !!req.session.userId , user = "guest", account_types.guest)
		},
        partials: setMainView("/login")
    })
});

server.get('/sign-up', (req, res) => {
	res.render('index', {
		locals: {
			navs: setNavs(req.url, navs, !!req.session.userId , user = "guest", account_types.guest)
		},
		partials: setMainView('sing-up')
	})
})

server.post('/sign-up', async (req, res) => {
	const { password, username, account } = req.body;

	const salt = await bycrypt.genSalt(10);

	const hashedPassword = await bycrypt.hash(password, salt);
	
	try {
		const newUser = {
			username,
			password: hashedPassword,
			account
		};

		await insertNewUserInDataBase(newUser);

		res.json({ 
			message: 'User created successfully!',
			redirectTo: '/login'
		});

	} catch (error) {
		console.log(error);
		res.status(500).json({error: "Unable to create user"});
	}
})

server.get('/ourteam', (req, res) => {
	res.render('index', {
		locals: {
			navs: setNavs(req.url, navs, !!req.session.userId , user = "guest", account_types.guest)
		},
		partials: setMainView('ourteam')
	})
})

// Endpoints for admin

server.get('/dashboard/admin/:user', async (req, res) => {
    const user = req.params.user;
	const userSession = req.session.userId;
	const { orders, sales } = await ordersCount()
	res.render('index', {
		locals: { 
			view_count: await getVisitorsCount(),
			number_of_orders: orders,
			total_sales: sales,
			user_logged: user,
			navs: setNavs(req.url, navs, !!req.session.userId , user, account_types.admin)
		},
		partials: setMainView('dashboard')
	})
})

server.get('/products/admin/:user', (req, res) => {
	const { user } = req.params.user;
	const userSession = req.session.userId;
	if(!userSession){
		return res.redirect('/')
	}

	res.render('index', {
		locals: {
			navs: setNavs(req.url, navs, !!req.session.userId , userSession, account_types.admin)
		},	
		partials: setMainView('add-products')
	})
})

server.post('/create-product', (req, res) => {
	const { name, category, url, price, sale, description} = req.body;

	const product = {
		name,
		category,
		url,
		price,
		sale,
		description
	}

	try {

		addNewProduct(product)
		res.json({message: "Product successfully added to database", product_created: product,})
	} catch (error) {
		console.error(error)
		res.status(500).json({error: "Unable to create a product now"})
	}
})

// Retrive endpoints

server.get('/api/products', async (req, res) => {
	const products = await getProducts();
	try {
		products ? res.json(products) : res.json({message: 'Create your first product'});
	} catch (error) {
		console.error(error)
		res.status(500).json({error: 'Unable to retrive the data now'})
	}
})

server.get('/orders/admin/:user', (req, res) => {
	const userSession = req.session.userId;
	if(!userSession){
		return res.redirect('/')
	}

	res.render('index', {
		locals: {
			navs: setNavs(req.url, navs, !!req.session.userId , userSession, account_types.admin)
		},	
		partials: setMainView('orders')
	})
})

server.get('/api/orders', async (req, res) => {
	const orders = await getOrdersHistory();
	try {
		orders ? res.json(orders) : res.json({message: 'No sales yet!'})
	} catch (error) {
		console.error(error)
		res.status(500).json({error: 'Unable to retrive all the sales now'})
	}
})

// Server PORT listening.
server.listen(PORT, () => {
	console.log(`The server is running at PORT ${PORT}`)
})



