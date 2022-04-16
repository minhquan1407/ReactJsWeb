const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        showMiniCart: false,
        cartItems: [],

    },
    reducers: {
        showMiniCart(state) {
            state.showMiniCart = true;
        },

        hideMiniCart(state) {
            state.showMiniCart = false;
        },
        addToCart(state, action) {
            // newItem = {id, product, quantity } phỉa đủ 3 cái thông tin này
            const newItem = action.payload;
            const index = state.cartItems.findIndex(x => x.id === newItem.id);

            if (index >= 0) {
                // increase quantity
                state.cartItems[index].quantity += newItem.quantity
                // số lượng hiên tại + vs số lượng mới
            } else {
                //add to card
                state.cartItems.push(newItem)
            }
        },
        setQuantity(state, action) {
            const { id, quantity } = action.payload;
            // check if product is available in cart
            const index = state.cartItems.findIndex((x) => x.id === id);
            if (index >= 0) {
                state.cartItems[index].quantity = quantity;
                // sẽ đi cập nhập cái quantity của mình bằng cái quantity truyền lên
            }
        },
        removeFromCart(state, action) {
            const idNeedToRemove = action.payload;// truyền lên thằng id mún remove ra khỏi d/s dỏ hàng
            state.cartItems = state.cartItems.filter(x => x.id !== idNeedToRemove);
            //clone ra 1 cái mảng mới kh có cái idNeedToRemove này 
        },
    },
});

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart } = actions; //named export

export default reducer; // default export