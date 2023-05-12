const { db } = require('./products');

// Server code 
function setMainView(view){
    return {
        header: "partials/header",
        footer: "partials/footer",
        main: `partials/main/${view}`
    }
};

function setNavs(currentHref, navs, isAuthenticated) {
    const account_type = {
        admin: 'admin',
        customer: 'customer'
    }
    const _navs = navs.map(nav => {
        nav.className = "";
        if(nav.href === currentHref){
            // nav.className = "active"
            nav.className = "active:bg-blue-600"
        }
        // get the information from the req object
        if(nav.href === '/dashboard/user'){
            nav.href += `/jhongarcian`
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

module.exports = { setMainView, setNavs, generateId, getVisitorsCount, insertNewUserInDataBase, getPasswordFromDataBase };