let productsInCart = localStorage.getItem("products-in-cart");
let productsInCartLocalStorage = localStorage.getItem("products-in-cart");
productsInCart = JSON.parse(productsInCartLocalStorage);
// LLamado al DOM

const containerEmptyCart = document.querySelector("#empty-cart");
const containerProductsCart = document.querySelector("#products-cart");
const containerCartActions = document.querySelector("#cart-actions");
const containerBuyCart = document.querySelector("#buy-cart");
let buttonsDelete = document.querySelectorAll(".product-cart-delete");
const cartActionEmpty = document.querySelector("#cart-action-empty");
const containerTotal = document.querySelector("#total");
const containerActionBuy = document.querySelector("#cart-action-buy");

//Agregar los productos del carrito

function updateProductsCart() {
    if (productsInCart && productsInCart.length > 0){
        
        containerEmptyCart.classList.add("disabled");
        containerProductsCart.classList.remove("disabled");
        containerCartActions.classList.remove("disabled");
        containerBuyCart.classList.add("disabled");
        
        containerProductsCart.innerHTML = "";
        productsInCart.forEach(product =>{
        const div = document.createElement("div");
        div.classList.add("product-cart");
        div.innerHTML = `
        <img class="product-cart-image" src="${product.img}" alt="${product.title}">
        <div class="product-cart-title">
            <small>Titulo</small>
            <h3 class="product-cart-title-description">${product.title}</h3>
        </div>
        <div class="product-cart-amount">
            <small>Cantidad</small>
            <p>${product.amount}</p>
        </div>
        <div class="product-cart-price">
            <small>Precio</small>
            <p>$${product.price}</p>
        </div>
        <div class="product-cart-subtotal">
            <small>Subtotal</small>
            <p>$${product.price * product.amount}</p>
        </div>
        <button id="${product.id}" class="product-cart-delete"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
          </svg>
        </button> 
        `;
        containerProductsCart.append(div); 
    })

updateButtonsDelete ();
updateTotal ()

}else{

    containerEmptyCart.classList.remove("disabled");
    containerProductsCart.classList.add("disabled");
    containerCartActions.classList.add("disabled");
    containerBuyCart.classList.add("disabled");
}

}

updateProductsCart();

// Eliminar productos del carrito

function updateButtonsDelete (){
    buttonsDelete = document.querySelectorAll(".product-cart-delete");

    buttonsDelete.forEach(button => {
        button.addEventListener("click", deleteCart);
    });
}

function deleteCart (event){
    Toastify({
        text: "Producto eliminado.",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #f00606, #f00606)",
          borderRadius: "1rem",
        },
        
        onClick: function(){} // Callback after click
      }).showToast();

    const idButton = event.currentTarget.id;
    const index = productsInCart.findIndex(product => product.id === idButton);
    productsInCart.splice(index, 1);
    updateProductsCart();

    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
}

cartActionEmpty.addEventListener("click", emptyCart);

function emptyCart(){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "¿Estás seguro?",
        text: "¡Se borrarán todos tus productos!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No, cancelar",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {    
            productsInCart.length = 0;
            localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
            updateProductsCart();
          swalWithBootstrapButtons.fire({
            title: "Eliminado",
            text: "Se borraron todos tus productos.",
            icon: "error"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Sigue con tu compra",
            icon: "success" 
          });
        }
      });
    }

function updateTotal (){
    const totalResult = productsInCart.reduce((acc, product) => acc +(product.price * product.amount), 0);
    total.innerText = `$${totalResult}`;
}

containerActionBuy.addEventListener("click", buyCart);

function buyCart(){
    productsInCart.length = 0;
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
    containerEmptyCart.classList.add("disabled");
    containerProductsCart.classList.add("disabled");
    containerCartActions.classList.add("disabled");
    containerBuyCart.classList.remove("disabled");
}