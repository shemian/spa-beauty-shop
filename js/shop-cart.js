 // console.log('nnc')
let productsInCart = JSON.parse(localStorage.getItem('ShoppingCart'));
if(!productsInCart){
    productsInCart =[];
}

const parentElement = document.querySelector("#buyItems");
const cartsumprice = document.querySelector("#sum-price");
const products = document.querySelectorAll('.product-under');


const countTheSumPrice = function(){
    let sumprice = 0;
    productsInCart.forEach(product =>{
        sumprice += product.price;
    });
    return sumprice;
}


const updateShoppingCartHTML= function(){
    localStorage.setItem('ShoppingCart', JSON.stringify(productsInCart));
    if(productsInCart.length > 0){
        let result=productsInCart.map(product => {
            return `
            <tr class="cart_item" > 

                <td class="product-remove">
                    
                </td>

                <td class="product-thumbnail">
                    <a href="shop-product-right.html">
                        <img width="180" height="180" src="images/shop/02.jpg" class="" alt="">
                    </a>
                </td>

                <td class="product-name" data-title="Product">
                    <a href="shop-product-right.html">${product.name}</a>
                </td>

                <td class="product-price" data-title="Price">
                    <span class="amount">
                        <span>ksh</span>${product.price}
                    </span>
                </td>

                <td class="product-quantity" data-title="Quantity">
                    <div class="quantity">
                    <button style="border: none;" class="button-minus" data-id='${product.id}'>-</button>
                    <span class="countOfProduct">${product.count}</span>
                    <button style="border: none;" class="button-plus" data-id='${product.id}'>+</button>
                    </div> 
                </td>

                <td class="product-subtotal" data-title="Total">
                    <span class="amount">
                        <span>ksh</span>${product.price}
                    </span>
                </td> 
			</tr>
            `
            
        });
        parentElement.innerHTML = result.join('');
        document.querySelector('.checkout').classList.remove('hidden')
        cartsumprice.innerHTML ="Total ksh: " + countTheSumPrice();

    }
}


function updateProductsInCart(product){
    for(let i=0; i<productsInCart.length; i++){
       if(productsInCart[i].id==product.id){
           productsInCart[i].count+= 1;
           productsInCart[i].price = productsInCart[i].baseprice *  productsInCart[i].count
           return;
       }
    }
    productsInCart.push(product);
}

let removeItem=document.getElementsByClassName('remove')





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
updateShoppingCartHTML();
