// Arrays de objetos

const products =[
    // Buzos
    {
        id: "buzo-jordan-01",
        title: "Buzo Jordan Brooklyn",
        img: "./Galery/Img/buzo-jordan-01.jpg",
        category:{
            name: "Buzos",
            id: "Buzos",
        },
        price: 64.999,
    },
    {
        id: "buzo-puma-02",
        title: "Buzo Puma Squad Fl",
        img: "./Galery/Img/buzo-puma-02.jpg",
        category:{
            name: "Buzos",
            id: "Buzos",
        },
        price: 46.999,
    },
    {
        id: "buzo-nike-03",
        title: "Buzo Urbano Nike Sportwear",
        img: "./Galery/Img/buzo-nike-03.jpg",
        category:{
            name: "Buzos",
            id: "Buzos",
        },
        price: 57.999,
    },
    {
        id: "buzo-puma-04",
        title: "Buzo Puma X Trp",
        img: "./Galery/Img/buzo-puma-04.jpg",
        category:{
            name: "Buzos",
            id: "Buzos",
        },
        price: 67.999,
    },
    // Pantalones
    {
        id: "pantalon-adidas-01",
        title: "Pantalón Adidas Always",
        img: "./Galery/Img/pantalon-adidas-01.jpg",
        category:{
            name: "Pantalones",
            id: "Pantalones",
        },
        price: 85.699,
    },
    {
        id: "pantalon-puma-02",
        title: "Pantalón Puma X Trp",
        img: "./Galery/Img/pantalon-puma-02.jpg",
        category:{
            name: "Pantalones",
            id: "Pantalones",
        },
        price: 65.999,
    },
    {
        id: "pantalon-nike-03",
        title: "Patalón Nike Sportwear",
        img: "./Galery/Img/pantalon-nike-03.jpg",
        category:{
            name: "Pantalones",
            id: "Pantalones",
        },
        price: 74.799,
    },
    {
        id: "pantalon-adidas-04",
        title: "Pantalón Adidas Mat",
        img: "./Galery/Img/pantalon-adidas-04.jpg",
        category:{
            name: "Pantalones",
            id: "Pantalones",
        },
        price: 22.999,
    },
    // Remeras
    {
        id: "remera-jorda-01",
        title: "Remera Jordan Essentials",
        img: "./Galery/Img/remera-jordan-01.jpg",
        category:{
            name: "Remeras",
            id: "Remeras",
        },
        price: 29.499,
    },
    {
        id: "remeras-adidas-02",
        title: "Remera adidas City Escape",
        img: "./Galery/Img/remera-adidas-02.jpg",
        category:{
            name: "Remeras",
            id: "Remeras",
        },
        price: 49.999,
    },
    {
        id: "remera-nike-03",
        title: "Remera Urbana Nike Icon",
        img: "./Galery/Img/remera-nike-03.jpg",
        category:{
            name: "Remeras",
            id: "Remeras",
        },
        price: 25.999,
    },
    {
        id: "remera-nike-04",
        title: "Remera Nike Nsw",
        img: "./Galery/Img/remera-nike-04.jpg",
        category:{
            name: "Remeras",
            id: "Remeras",
        },
        price: 22.499,
    },
    // Zapatillas
    {
        id: "zapatillas-jordan-01",
        title: "Zapatillas Jordan 1 Zoom",
        img: "./Galery/Img/zapatillas-jordan-01.jpg",
        category:{
            name: "Zaptillas",
            id: "Zapatillas",
        },
        price: 182.999,
    },
    {
        id: "zapatillas-nike-02",
        title: "Zapatillas Nike Air Force 1 07 Lv8",
        img: "./Galery/Img/zapatillas-nike-02.jpg",
        category:{
            name: "Zapatillas",
            id: "Zapatillas",
        },
        price: 156.499,
    },
    {
        id: "zapatillas-adidas-03",
        title: "Zapatillas adidas Nmd G1",
        img: "./Galery/Img/zapatillas-adidas-03.jpg",
        category:{
            name: "Zapatillas",
            id: "Zapatillas",
        },
        price: 104.199,
    },
    {
        id: "zapatillas-puma-04",
        title: "Zapatillas Puma Suede Classic",
        img: "./Galery/Img/zapatillas-puma-04.jpg",
        category:{
            name: "Zapatillas",
            id: "Zapatillas",
        },
        price: 65.999,
    },
]

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

loadProducts(products);

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
    