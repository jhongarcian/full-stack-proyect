function reformatSession(session, items) {
    const date = dateToString(session.created)

    return {
        customerName: session.customer_details.name,
        customerEmail: session.customer_details.email,
        subTotalAmount: session.amount_subtotal,
        totalAmount: session.amount_total,
        date_created: date,

        items: items.data.map(element => {
            return {
                amount: element.amount_subtotal,
                currency: element.currency,
                itemName: element.description,
                itemPrice: element.price.unit_amount,
                quantity: element.quantity
            };
        })
    };
};

function dateToString(number) {
    const timestamp = number;
    const date = new Date(timestamp * 1000);
    const dateString = date.toLocaleDateString("en-US");
    return dateString
}
module.exports = { reformatSession };