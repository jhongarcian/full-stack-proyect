const button = document.querySelector("button")
button.addEventListener("click", async () => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: [
                { id: 1, quantity: 3 },
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