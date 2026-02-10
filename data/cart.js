const cart = []
document.querySelectorAll('.js-add-to-cart')
  .forEach((button)=>{
    button.addEventListener('click',()=>{
      const id = button.dataset.productId
      let matchItem;
      
      cart.forEach((cartProduct) =>{
        if (id === cartProduct.productId){
          matchItem = cartProduct;
        }});

        if (matchItem){
          matchItem.quantity += 1
        }else{
          cart.push({
            productId : id,
            quantity : 1
          });
        }
        console.log(cart)
      })
  })