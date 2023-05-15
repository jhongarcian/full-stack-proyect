const { db } = require('./products');

// Server code 
function setMainView(view){
    return {
        header: "partials/header",
        footer: "partials/footer",
        main: `partials/main/${view}`
    }
};

function setNavs(currentHref, navs, isAuthenticated, user, account) {
    const account_type = {
        admin: 'admin',
        customer: 'customer',
        guest: 'guest'
    }
    const _navs = navs.map(nav => {
        nav.className = "";
        if(nav.href === currentHref){
            // nav.className = "active"
            nav.className = "active:bg-blue-600"
        }
        if(account === account_type.guest) {
            console.log("You are logged as a guest")
            nav.href
        }
        // modify the route for the url 
        if(account === account_type.admin){
            console.log("You are logged as an admin")
            nav.href !== '/logout' && nav.href !== '/' && nav.href !== '/login' && nav.href !== '/ourteam' && nav.href !== '/products' && nav.href !== '/cart' && nav.href !== '/favorites' && !nav.href.includes(user) ? nav.href += `/${user}` : nav.href
        }
        if(account === account_type.customer){
            console.log("You are logged as a customer")
            nav.href !== '/logout' && !nav.href.includes(user) ? nav.href += `/${user}` : nav.href
        }
        return nav
    }).filter(nav => {
        if(!isAuthenticated) {
            return !nav.isPrivate
        } else {
            return nav.isPrivate || nav.isPrivate === undefined
        }
    })
    return {navs: _navs}
};

function generateId() {
    return Math.floor(Math.random() * Date.now()).toString(16)
}

async function getVisitorsCount() {
    const visitors = (await db.any('SELECT COUNT(*) FROM visitors;')).map(item => item.count)[0];
    const numberCount = visitors * 1
    return numberCount
}

async function insertNewUserInDataBase(user) {
    const {username, password, account} = user;
    await db.any(`INSERT INTO users(username, password, account_type) VALUES('${username}', '${password}', '${account}');`)
}

async function getPasswordFromDataBase(username) {
    const user = await db.any(`SELECT * FROM users WHERE username = '${username}';`)
    return user[0]
}

function checkSession(req, res) {
    if(!req.session.userId) {
        return res.redirect('/');
    }
}

module.exports = { setMainView, setNavs, generateId, getVisitorsCount, insertNewUserInDataBase, getPasswordFromDataBase, checkSession };