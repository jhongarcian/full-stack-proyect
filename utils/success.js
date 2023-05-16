function success(dataFromCheckout) {
    const html = `
        <section
        class="flex flex-col lg:flex-row sm:max-w-screen-lg md:mx-auto lg:py-48"
        >
        <div
        class="w-screen h-80 lg:h-auto lg:max-w-xl lg:pr-8 md:rounded-md md:outline md:outline-transparent md:border-transparent md:overflow-hidden"
        >
        <img
            class="w-full object-left-top object-cover h-full"
            src="backendphotos/pexels-gül-işık-2305760.jpg"
            alt=""
        />
        </div>
        <section class="w-9/12 mx-auto py-20 h-full">
        <div class="sm:container">
            <div class="pb-16 flex flex-col gap-1">
            <span class="text-indigo-500">Payment successful</span>
            <h1 class="font-semibold tracking-normal text-black text-5xl">
                Thanks for ordering
            </h1>
            <span class="text-stone-500"
                >We appreciate your order, we’re currently processing it. So hang
                tight and we’ll send you confirmation very soon!</span
            >
            </div>
            <div class="flex flex-col pb-4">
            <span class="text-sm">Order #</span>
            <span class="text-indigo-500 text-sm">123456789908</span>
            </div>
            <div class="flex flex-col divide-y border-t-2 border-b-2">
            ${dataFromCheckout.items.map(element =>`
            <div class="py-4 flex justify-between">
                <div class="flex gap-4">
                <img
                    class="w-24 h-24 object-cover"
                    src="https://images.pexels.com/photos/4300393/pexels-photo-4300393.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                />
                <div class="flex flex-col gap-1">
                    <span>${element.itemName}</span>
                    <span>Quantity: ${element.quantity}</span>
                </div>
                </div>
                <div>
                <span>$${element.itemPrice / 100}</span>
                </div>
            </div>
            `).join("")}
            </div>
            <div class="border-b-2">
            <div class="border-b-2">
                <div class="py-4 flex justify-between">
                <span>Subtotal</span>
                <span>$${dataFromCheckout.subTotalAmount / 100}</span>
                </div>
                <div class="py-4 flex justify-between">
                <span>Taxes</span>
                <span>$0</span>
                </div>
            </div>
            <div class="py-8">
                <div class="flex justify-between pb-8">
                <span>Total</span>
                <span>$${dataFromCheckout.totalAmount / 100}</span>
                </div>
                <div class="flex flex-col gap-1 pb-4">
                <span>Payment Information</span>
                <span class="text-stone-500">${dataFromCheckout.customerName}</span>
                <span class="text-stone-500"
                    >${dataFromCheckout.customerEmail}</span
                >
                </div>
            </div>
            </div>
            <div class="w-full text-end pt-4">
            <a href="/" class="text-indigo-500">Continue Shopping </a>
            </div>
        </div>
        </section>
    </section>
    `;
    return html;
}

module.exports = { success }