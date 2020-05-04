export const addItemToCart = (cartItems, cardItemToAdd) => {
    const existingCartItem = cartItems.find(
        cardItem => cardItem.id === cardItemToAdd.id
    );

    if(existingCartItem){
        return cartItems.map( cartItem => 
            cartItem.id === cardItemToAdd.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem   
        )
    }

    return [...cartItems, { ...cardItemToAdd, quantity:1 }];
};

export const removeItemFromCart = (cartItems, cardItemToRemove) => {
    const existingCartItem = cartItems.find(
        cardItem => cardItem.id === cardItemToRemove.id
    );

    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cardItemToRemove.id)
    }

    return cartItems.map(
        cartItem => 
        cartItem.id === cardItemToRemove.id 
        ?
        { ...cartItem, quantity: cartItem.quantity - 1}
        :
        cartItem
    )
}

