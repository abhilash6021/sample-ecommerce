import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HIMZGESz51u1QiiI1zxe21klfc8CKZPHsu6HgaT6RNHX2Lg4753LLdWwtq4DOGiTJ3HpIhrGbOsSmiiLNspQ5Ox00iQ3KfXLc'

    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
    }
    
    return (
        <StripeCheckout 
            label='Pay Now'
            name ='CRWN-Clothing Ltd.'
            billingAddress
            shippingAddress
            image = 'https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount= {priceForStripe}
            panelLabel='Pay Now'
            token = {onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;