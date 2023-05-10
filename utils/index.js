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
    const _navs = navs.map(nav => {
        nav.className = "";
        if(nav.href === currentHref){
            // nav.className = "active"
            nav.className = "active:bg-blue-600"
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
    console.log(numberCount)
    return numberCount
}

module.exports = { setMainView, setNavs, generateId, getVisitorsCount };