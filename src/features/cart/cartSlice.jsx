import { createSlice } from '@reduxjs/toolkit';
import { formatCurrency } from '../../utils/helpers';

const initialState = {
  cart: []
  // cart: [
  //   {
  //     pizzaId: null,
  //     name: '',
  //     quantity: null,
  //     unitPrice: null,
  //     totalPrice: null
  //   }
  // ]
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      const filtered = state.cart.filter((item) => {
        return item.pizzaId !== action.payload;
      });
      state.cart = filtered;
    },
    increaseItemQuantity(state, action) {
      const index = state.cart.findIndex(
        (item) => item.pizzaId === action.payload
      );
      if (index === -1) return;
      const item = state.cart[index];
      state.cart[index].quantity += 1;
      state.cart[index].totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const index = state.cart.findIndex(
        (item) => item.pizzaId === action.payload
      );
      const item = state.cart[index];
      if (item.quantity === 0) return;
      state.cart[index].quantity -= 1;
      state.cart[index].totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    }
  }
});

export function getCart(state) {
  return state.cart.cart;
}

export function getTotalCartQuantity(state) {
  return state.cart.cart.reduce((acc, cur) => acc + cur.quantity, 0);
}

export function getTotalCartPrice(state) {
  const value = state.cart.cart.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0
  );
  return formatCurrency(value);
}

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
