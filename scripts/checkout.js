import { cart, removeFromCart } from "../data/cart.js"
import { products } from "../data/products.js"

let orderSummuryHTML = '';


function orderSummery(productInfo,cartProduct){
  let oneOrderHTML = `
  <div class="cart-item-container
  js-cart-item-container-${productInfo.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${productInfo.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${productInfo.name}
                </div>
                <div class="product-price">
                  $${(productInfo.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartProduct.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary
                  js-delete-quantity" data-product-id='${productInfo.id}'>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${productInfo.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productInfo.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productInfo.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `
  orderSummuryHTML += oneOrderHTML;
}

function summury (){
  let countItems = 0;
  let fullPrise = 0;

  cart.forEach((cartProduct) =>{

  // getting full info about product
  let productInfo;
  products.forEach((fullProduct)=>{
    if (fullProduct.id === cartProduct.productId){
      productInfo = fullProduct
    }
  })
  countItems += cartProduct.quantity;
    fullPrise += (cartProduct.quantity * productInfo.priceCents)
  })

  
  let shipping = 499 
  let paymantSummaryHTML =`
  <div class="payment-summary-title">
              Order Summary
            </div>

            <div class="payment-summary-row">
              <div>Items (${countItems}):</div>
              <div class="payment-summary-money">$${(fullPrise/100).toFixed(2)}</div>
            </div>

            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$${(shipping/100).toFixed(2)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$${((fullPrise+shipping)/100).toFixed(2)}</div>
            </div>

            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$${(((fullPrise+shipping)/1000).toFixed(2))}</div>
            </div>

            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$
              ${((fullPrise+shipping+Number(((fullPrise+shipping)/10).toFixed()))/100).toFixed(2)}
              </div>
            </div>

            <button class="place-order-button button-primary">
              Place your order
            </button>`


  document.querySelector('.payment-summary')
    .innerHTML = paymantSummaryHTML

  document.querySelector('.return-to-home-link')
    .innerHTML = `${countItems} items`}





cart.forEach((cartProduct) =>{

  // getting full info about product
  let productInfo;
  products.forEach((fullProduct)=>{
    if (fullProduct.id === cartProduct.productId){
      productInfo = fullProduct
    }
  })

  orderSummery(productInfo,cartProduct)
  document.querySelector('.order-summary')
  .innerHTML = orderSummuryHTML
})

document.querySelectorAll('.js-delete-quantity')
  .forEach((link) => {
    link.addEventListener('click',()=>{
      const prodId = link.dataset.productId;
      removeFromCart(prodId)


      document.querySelector(`.js-cart-item-container-${prodId}`).remove()
      summury()   
    })
})

summury()

console.log(document.querySelector('.delivery-option-input'))
