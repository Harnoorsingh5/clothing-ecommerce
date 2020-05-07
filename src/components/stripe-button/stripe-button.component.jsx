import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_bw3U22wrKfmGrE9ZygGz400v00GNcrJA20';

    const onToken = token => {
        console.log(token);
        alert("Payment Successful");
    }

    return(
        <StripeCheckout
            label="Pay Now"
            name="Ecommerce Clothing"
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;