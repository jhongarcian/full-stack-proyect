const button = document.querySelector("[button]")
if(button) {
    button.addEventListener("click", async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [
                    { id: 4, quantity: 2 },
                    { id: 2, quantity: 1 }
                ]
            })
        }
        try {
            const response = await fetch('/create-checkout-session', options)
            if(response.ok){
                const data = await response.json()
                console.log(data.url)
                window.location = data.url
                return
            }
        } catch (error) {
            console.error(error)
        }
    
    })
};



// Function to fetch the next 20 products
const pageTurn = () => {

    fetch(`http://localhost:8080/products/page/20`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
            offnum: 20 // Set the value of offnum in the request headers
        }
    }) .then(response => response.json()) .then(data => {

        // Refresh the page with the new products
        window.location.reload();
    })
}


const nextPage = document.getElementById("nextPage")
nextPage.addEventListener('click', () => {
    pageTurn()
})