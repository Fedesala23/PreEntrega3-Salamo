// Array de objetos

let products =[]

fetch("./JS/productos.json")
    .then(response => response.json())
    .then(data =>{
        products = data;
        loadProducts(products);
    })

// Llamado del DOM

const containerProducts = document.querySelector("#container-products");
const buttonsCategory = document.querySelectorAll(".button-category");
const principalTitle = document.querySelector("#principal-title");
let buttonsadd = document.querySelectorAll(".product-button");
const numberCart = document.querySelector("#number-cart");

// Recorrer y mostrar los objetos

function loadProducts(productsSelected){

    containerProducts.innerHTML = "";

    productsSelected.forEach( product => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
        <img class="product-image" src="${product.img}" alt="${product.title}">
        <div class="product-description">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price}</p>
            <button class="product-button" id="${product.id}">Agregar</button>
        </div>
        `;

        containerProducts.append(div);
    })

    updateButtonsAdd();
}

//Activar botones de categoria y filtrar

buttonsCategory.forEach(button => {
    button.addEventListener("click", (event) =>{
        buttonsCategory.forEach(button => button.classList.remove("active"));
        event.currentTarget.classList.add("active");
        if(event.currentTarget.id !== "Todos"){
            const productsCateogry = products.find (product => product.category.id === event.currentTarget.id);
            principalTitle.innerText = productsCateogry.category.name;

            const productsButton = products.filter(product => product.category.id === event.currentTarget.id);
            loadProducts(productsButton);
        }else{
            principalTitle.innerText = "Todos los productos";
            loadProducts(products);
        };
    })
})

function updateButtonsAdd (){
    buttonsadd = document.querySelectorAll(".product-button");

    buttonsadd.forEach(button => {
        button.addEventListener("click", addToCart);
    });
}

// Agregar productos al carrito

let productsInCart;

let productsInCartLocalStorage = localStorage.getItem("products-in-cart");

if(productsInCartLocalStorage){
    productsInCart = JSON.parse(productsInCartLocalStorage);
    updateNumberCart();
}else{
    productsInCart = [];
}


function addToCart(event){
    Toastify({
        text: "Agregado al carrito.",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #FC466B, #3F5EFB)",
          borderRadius: "1rem",
        },
        
        onClick: function(){} // Callback after click
      }).showToast();

    const idButton = event.currentTarget.id;
    const productAdd = products.find(product => product.id === idButton);
    if(productsInCart.some(product => product.id === idButton)){
        const index = productsInCart.findIndex(product => product.id === idButton);
        productsInCart[index].amount++;
    }else{
        productAdd.amount = 1;
        productsInCart.push(productAdd); 
    }
    updateNumberCart();

    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
}

function updateNumberCart(){
    let newNumber = productsInCart.reduce((acc, product) => acc + product.amount, 0);
    numberCart.innerText = newNumber;
}
    