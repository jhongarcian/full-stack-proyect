function stringifyFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 4);
}

const button_checkout = document.querySelector("[button]")
if(button_checkout) {
    button_checkout.addEventListener("click", async () => {
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
if(window.location.pathname === '/products'){
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
}

if(window.location.pathname === "/login"){
    const form = document.getElementById('form');
    const credsContainer = form.querySelector("#credentials-container")
    console.log(credsContainer)
  
    const handleSignupFormSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const stringified = stringifyFormData(data);
      const response = await doLogin(stringified)
      // With this location.href will take us to the correct page
      location.href = response.redirectTo;
      console.log(`The current data is : ${response.current_data}`)
      console.log(`The user is logged in: ${response.isAuthenticated}`)
    };
  
    renderForm()
    document.addEventListener('submit', handleSignupFormSubmit);
  
    function renderForm() {
      const html = `
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <a class="text-blue-600 pt-4 text-center" href="/sign-up">Register now!</a>
      <input type="submit" value="Login" class=" mt-1 py-2 text-white rounded-md cursor-pointer bg-indigo-600 hover:bg-indigo-500 active:bg-violet-700 hover:outline-none  sm:text-sm"/>
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


  if(window.location.pathname === '/sign-up') {
    const form = document.getElementById('form');
    const accountContainer = form.querySelector("#create-account-form")
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      const data = new FormData(e.target);
      const stringified = stringifyFormData(data);
      const response = await createUser(stringified);
      location.href = response.redirectTo;
    }

    renderForm()
    form.addEventListener('submit', handleSubmit);

    function renderForm() {
      const html = `
      <label class="flex flex-col items-start">
        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 sm:text-sm" >Username</span>
        <input type="text" name="username" class="mt-1 px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"/>
      </label>
      <label class="flex flex-col items-start">
        <span class="after:content-['*'] after:ml-0.5 after:text-red-500 sm:text-sm" >Password</span>
        <input type="password" name="password" class="mt-1 px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"/>
      </label>
      
      <span for='prompt' class="pt-3 after:content-['*'] after:ml-0.5 after:text-red-500 sm:text-sm">Account type</span>

      <label for='prompt' class=" sr-only after:content-['*'] after:ml-0.5 after:text-red-500 sm:text-sm" >Choose an account</label>

      <select name="account" id="prompt" class="block py-2.5 px-0 w-20 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mx-auto text-center">
        <option value='customer'>Customer</option>
        <option value='admin'>Admin</option>
      </select>
      
      <input type="submit" value="Sign up" class=" mt-4 py-2 text-white rounded-md cursor-pointer bg-indigo-600 hover:bg-indigo-500 active:bg-violet-700 hover:outline-none  sm:text-sm"/>
      
      <a class="text-blue-600 pt-4 text-center sm:text-sm" href="/login">Already have an account?</a>
      `;
      accountContainer.innerHTML = html;
    }

    async function createUser(body) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      }
      const response = await fetch('/sign-up', options);
      const data = await response.json()
      return data
    }
  }



if(window.location.pathname.includes('/products/')) {
  const productContainer = document.querySelector('#product-container');
  
  async function handleClick(e) {
    if(e.target.matches('[add-product]')){
      const html = createAddProductContainer();
      productContainer.innerHTML = html;
    };
    if(e.target.matches('[overview]')){
      const data = await retriveAllProducts()
      const html = createOverviewTable(data)
      productContainer.innerHTML = html;
    }

  };

  document.addEventListener('click', handleClick)
  
  async function handleForm(e) {
    const form = document.getElementById('form-product')  
    const add_productContainer = document.querySelector('[add-product-container]')
    if(e.target.matches('[create-product-btn]')){
      e.preventDefault();
      const data = new FormData(form);
      const stringify = stringifyFormData(data);
      const response = await createProduct(stringify);
      if(add_productContainer){
        add_productContainer.remove();
        const html = successProduct(response);
        productContainer.innerHTML = html;
      }
    }
  };

  document.addEventListener('click', handleForm);    

  function successProduct(response) {
    console.log(response)
    const html = `
      <div class="flex items-center justify-center w-full px-6 flex-1">
        <div class=" flex flex-col gap-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span class="font-bold">${response.message}</span>
          <div class="my-2">
            <span class="font-bold">Name:</span>
            <span class="ml-1">${response.product_created.name}</span>
          </div>
          <div class="my-2">
            <span class="font-bold">Category:</span>
            <span class="ml-1">${response.product_created.category}</span>
          </div>
          <div class="my-2">
            <span class="font-bold">URL:</span>
            <span class="ml-1">${response.product_created.url || 'www.text.com'}</span>
          </div>
          <div class="my-2">
            <span class="font-bold">Price:</span>
            <span class="ml-1">$ ${response.product_created.price}</span>
          </div>
          <div class="my-2">
            <span class="font-bold">Sale:</span>
            <span class="ml-1">$ ${response.product_created.sale || 0}</span>
          </div>
          <div class="my-2">
            <span class="font-bold">Description:</span>
            <span class="ml-1">${response.product_created.description}</span>
          </div>
        </div>
      </div>

    `
    return html
  }

  function createAddProductContainer(){
    const html = `
      <article add-product-container class='flex-1 flex px-6 w-full lg:max-w-2xl'>
        <form id="form-product" class="flex - flex-col gap-2 w-full">
          <label required>
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 sm:text-sm">Product Name</span>
            <input type="text" name='name' placeholder="Nike Air Force" class="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"/>
          </label>
          <label required>
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 sm:text-sm">Category</span>
            <input type="text" name='category' placeholder="Smartphone" class="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"/>
          </label>
          <label required>
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 sm:text-sm">Url</span>
              <input type="url" name='url' placeholder="www.image.com" class="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"/>
          </label>
          <div class='flex gap-4 justify-between'>
            <label required class=" w-1/2">
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 sm:text-sm">Price</span>
              <input type="number" name='price' placeholder="$1500" class="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"/>
            </label>
            <label class=" w-1/2">
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 sm:text-sm">Sale</span>
              <input type="number" name='sale' placeholder="$1500" class="after:content-['$'] after:ml-[-10px] after:text-black  px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"/>
            </label>
          </div>
          <label required>
              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 sm:text-sm">Description</span>
              <input type="text" name='description' placeholder="Product description" class="px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"/>
          </label>

          <input create-product-btn type="submit" value="Create Product" class=" mt-4 py-2 text-white rounded-md cursor-pointer bg-indigo-600 hover:bg-indigo-500 active:bg-violet-700 hover:outline-none  sm:text-sm"/>
        </form> 
      </article>
    `
    return html;
  };

  function createOverviewTable(products) {
    console.log(products)
    const html = `
    <div class="flex flex-col overflow-x-auto flex-1 w-full ">
      <div class="w-full">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm font-light text-center">
              <thead class="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" class="px-3 py-4">#</th>
                  <th scope="col" class="px-3 py-4">Name</th>
                  <th scope="col" class="px-3 py-4">Price</th>
                  <th scope="col" class="px-3 py-4">Category</th>
                  <th scope="col" class="px-3 py-4">Url</th>
                  <th scope="col" class="px-3 py-4">Url Two</th>
                </tr>
              </thead>
              <tbody>
                ${products.map(item => `
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap px-3 py-4 font-medium">${item.id}</td>
                    <td class="whitespace-nowrap px-3 py-4">${item.name}</td>
                    <td class="whitespace-nowrap px-3 py-4">$ ${item.priceincents / 100}</td>
                    <td class="whitespace-nowrap px-3 py-4">${item.category}</td>
                    <td class="whitespace-nowrap px-3 py-4">${item.image_url_one}</td>
                    <td class="whitespace-nowrap px-3 py-4">${item.image_url_two}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    `
  return html;
  }

  async function createProduct(body) {
    const options = {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      },
    };
    try {
      const response = await fetch('/create-product', options);
      if(response.ok){
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function retriveAllProducts() {
    const options = {
      method: 'GET'
    }
    try {
      const response = await fetch('/api/products', options)
      if(response.ok) {
        const data = await response.json();
        return data
      }
    } catch (error) {
      console.error(error)
    }
  }
};

if(window.location.pathname.includes('/orders/admin/')){
  const ordersContainer = document.querySelector('#orders-container');
  
  renderOrders()
  
  function retriveOrders(orders) {
    console.log(orders)
    const html = `
    <div class="flex flex-col overflow-x-auto flex-1 w-full ">
      <div class="w-full">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm font-light text-center">
              <thead class="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" class="px-3 py-4">Name</th>
                  <th scope="col" class="px-3 py-4">Email</th>
                  <th scope="col" class="px-3 py-4">Sub-Amount</th>
                  <th scope="col" class="px-3 py-4">Total-Amount</th>
                  <th scope="col" class="px-3 py-4"># of Items</th>
                  <th scope="col" class="px-3 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                ${orders.map(item => `
                  <tr id='${item.id}' class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap px-3 py-4">${item.customer_name}</td>
                    <td class="whitespace-nowrap px-3 py-4">${item.customer_email}</td>
                    <td class="whitespace-nowrap px-3 py-4">$ ${item.subtotal_amount / 100}</td>
                    <td class="whitespace-nowrap px-3 py-4">$ ${item.total_amount / 100}</td>
                    <td class="whitespace-nowrap px-3 py-4">${item.item_count}</td>
                    <td class="whitespace-nowrap px-3 py-4">${item.purchase_date}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    `
  return html;
  }

  async function getOrders() {
    const options = {
      method: 'GET'
    }

    try {
      const response = await fetch('/api/orders', options);
      if(response.ok){
        const data = await response.json();
        console.log(data)
        return data
      }
    } catch (error) {
      console.error(error)
    };
  };

  async function renderOrders() {
    const orders = await getOrders();
    const html = retriveOrders(orders);
    ordersContainer.innerHTML = html
  }
};