const button=document.querySelector("button")
let fkj='4242 4242 4242 4242'
var stripeHandler = StripeCheckout.configure({
    key: stripePublicKey,
    locale: 'en',
    token: function(token) {
        console.log(token)
    }
})

button.addEventListener('click',()=>{
    var priceElement = document.querySelector('h3')
    var input = document.querySelector('input')
    var nprice = parseFloat(priceElement.innerText.replace('$', '')) * 100
    var price = nprice*parseFloat(input.value)
    stripeHandler.open({
        amount: price
    })
})