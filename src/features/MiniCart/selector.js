import { createSelector } from "@reduxjs/toolkit";

const cartItemsSelector = (state) => state.cart.cartItems;
// state.cart.cartItems có nghĩa là nó đi từ, trong file store.js từ cái store đi vào rootReducer chính là state
// . cart trong cái cartReducer(cartSlice) lấy thằng thằng cartItems có nghĩa là lấy d/s các cartItem của mình


// Count number of products in cart

export const cartItemsCountSelector = createSelector(cartItemsSelector, (cartItems) =>
    cartItems.reduce((count, item) => count + item.quantity, 0)
);

export const cartTotalSelector = createSelector(cartItemsSelector, (cartItems) =>
    cartItems.reduce((total, item) => total + item.product.salePrice * item.quantity, 0)
);

// createSelector là thằng đc export từ thư viện Reselect