const button_checkout = document.querySelector("[button]")
if(button_checkout) {
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

if(window.location.pathname === "/login"){
    const form = document.getElementById('form');
    const credsContainer = form.querySelector("#credentials-container")
  
    function stringifyFormData(fd) {
      const data = {};
      for (let key of fd.keys()) {
        data[key] = fd.get(key);
      }
      return JSON.stringify(data, null, 4);
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const stringified = stringifyFormData(data);
      const response = await doLogin(stringified)
      // With this location.href will take us to the correct page
      location.href = response.redirectTo;
      console.log(`The user is logged in: ${response.isAuthenticated}`)
    };
  
    renderForm()
    form.addEventListener('submit', handleSubmit);
  
    function renderForm() {
      const html = `
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <input class="form-btn" type="submit" value="Login" />
      `;
      credsContainer.innerHTML = html
    }
  
    async function doLogin(body) {
      const options = {
        body,
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      }
  
      const response = await fetch("/login", options);
      const data = await response.json()
      return data
    }
  }
