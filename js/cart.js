// console.log('nnc')
let productsInCart = [];
const parentElement = document.querySelector("#buyItems");
const cartsumprice = document.querySelector("#sum-price");
const products = document.querySelectorAll('.product-under');


const countThesumprice = function(){
    let sumprice = 0;
    productsInCart.forEach(product =>{
        sumprice += product.price;
    });
    return sumprice;
}


const updateShoppingCartHTML= function(){
    if(productsInCart.length > 0){
        let result=productsInCart.map(product => {
            return `
            <li class="woocommerce-mini-cart-item mini_cart_item" id="buyItems">
                <a href="#" class="remove" aria-label="Remove this item" data-product_id="73" data-product_sku="">×</a>
                <a>
                    <img src="images/shop/26.jpg" alt="">${product.name}
                </a>

                <span class="quantity">
                    <span class="woocommerce-price-amount amount">
                        <span class="woocommerce-price-currencySymbol">ksh</span>
                        ${product.price}
                    </span>

                    <span>
                        <button style="border: none;" class="button-minus" data-id='${product.id}'>-</button>
                        <span class="countOfProduct">${product.count}</span>
                        <button style="border: none;" class="button-plus" data-id='${product.id}'>+</button>
                        
                    </span>
                </span>
            </li>
            `
            
        });
        parentElement.innerHTML = result.join('');
        document.querySelector('.checkout').classList.remove('hidden')
        cartsumprice.innerHTML ="Total ksh: " + countThesumprice();

    }else{
        document.querySelector('.checkout').classList.add('hidden');
        parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>'
        cartsumprice.innerHTML ="";

    }
}


function updateProductsInCart(product){
    for(let i=0; i<productsInCart.length; i++){
       if(productsInCart[i].id=product.id){
           productsInCart[i].count+= 1;
           productsInCart[i].price = productsInCart[i].baseprice *  productsInCart[i].count
           return;
       }
    }
    productsInCart.push(product);
}




products.forEach(product =>{
    product.addEventListener('click', (e)=>{
        if(e.target.classList.contains('addToCart')){
            const productID = e.target.dataset.productId;
            const productName=product.querySelector('.productName').innerHTML;
            const productPrice =product.querySelector('.priceValue').innerHTML;
            let productToCart = {
                name: productName,
                id: productID,
                count: 1,
                price: parseInt(productPrice),
                baseprice: parseInt(productPrice),
            }

            updateProductsInCart(productToCart);
            updateShoppingCartHTML();
        }
    });
});

parentElement.addEventListener('click', (e) => {
    const isPlusButton = e.target.classList.contains('button-plus');
    const isMinusButton = e.target.classList.contains('button-minus');
    if(isPlusButton || isMinusButton){
        for( let i=0; i< productsInCart.length; i++){
            if(productsInCart[i].id == e.target.dataset.id){
                if(isPlusButton){
                    productsInCart[i].count += 1;
                }
                else if(isMinusButton){
                    productsInCart[i].count -= 1;
                }
                productsInCart[i].price = productsInCart[i].baseprice * productsInCart[i].count;
            }
            if(productsInCart[i].count <=0){
                productsInCart.splice(i, 1) 
            }
        }

        updateShoppingCartHTML();
    }
});