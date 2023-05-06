function reformatSession(session, items) {
    return {
        customerName: session.customer_details.name,
        customerEmail: session.customer_details.email,
        subTotalAmount: session.amount_subtotal,
        totalAmount: session.amount_total,
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

module.exports = { reformatSession };