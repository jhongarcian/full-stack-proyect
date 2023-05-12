function categorySection(product, position) {
    let row = ""
    let gradient = ""
    position === "right" ? row = 'md:flex-row-reverse' : row = 'md:flex-row';
    position === 'right' ? gradient = 'bg-gradient-to-r from-gray-600 to-black ' : gradient = 'bg-gradient-to-r from-black to-gray-600';
    const html = `
        <div class="w-screen flex flex-col ${row}">
        <div class="relative flex-1 p-2">
            <img
            class="w-full h-full object-cover"
            src="https://images.pexels.com/photos/6858618/pexels-photo-6858618.jpeg"
            alt=""
            />
            <h2
            class="${gradient} spa tracking-[.015em] font-bold bg-clip-text absolute top-1/2 right-1/2 translate-x-[50%] translate-y-[-50%] text-3xl lg:text-6xl text-transparent"
            >
            ${product[0].category}
            </h2>
        </div>
        <div class="flex-1 flex flex-wrap">
            ${product.map(item => `
            <a href = "/products/${item.id}" class="w-1/2 h-1/2 flex flex-col gap-4 p-2">
            <img
                class=""
                src="${item.image_url_one}"
                alt=""
            />
            <div class="w-full">
                <div class="flex justify-between w-full mx-auto">
                <span class="font-medium">${item.name}</span>
                <span class="font-medium"> $${item.priceincents / 100}</span>
                </div>
            </div>
            </a>
            ` ).join("")}
        </div>
        </div>
    `
    return html;
}

function titleSection() {
    return `
        <div class="w-full text-center">
        <h2
        class="text-3xl lg:text-7xl uppercase font-sans font-bold py-8 pb-4 tracking-tighter"
        >
        the perfect gift
        </h2>
        <p class="font-sans pb-6">
        Discover our new range of cutting-edge electronic devices!
        </p>
        </div>
    `
}

function heroSection() {
    return `
        <img
        class="w-full h-full object-cover relative"
        src="https://images.pexels.com/photos/9956769/pexels-photo-9956769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Electronic hero image"
        />
        <div
            class="flex flex-col gap-5 items-center absolute top-2/4 right-2/4 translate-x-[50%] translate-y-[-50%] text-center"
        >
            <h1 class="text-white font-bold text-6xl tracking-tighter">
            New arrivals are here
            </h1>
            <p class="text-white text-xl hidden sm:block">
            The new arrivals have, well, newly arrived. Check out the latest options
            from our summer small-batch release while they're still in stock.
            </p>
            <a
            href="/products"
            class="transition duration-300 ease-in-out hover:scale-125 bg-white rounded cursor-pointer hover:bg-transparent hover:text-neutral-50 border-2 px-6 py-3"
            >
            Shop New Arrivals
            </a>
        </div>
    `
}

module.exports = { categorySection, titleSection, heroSection }