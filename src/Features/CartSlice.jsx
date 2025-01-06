import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const cookieExpiration = 86400;       // One day
const cartHeader = "cartid"

export const getCartItems = createAsyncThunk(
  "cart/GetCartItems",
  async () => {
    let cartCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("cart="))
    ?.split("=")[1];

    const response = await axios.get(import.meta.env.VITE_SERVER_API + "/Cart/GetCartItems/", {params: {cartid: cartCookie}});
    return response.data;
  }
);

export const addToCart = createAsyncThunk(
  "cart/AddToCart",
  async (data) => {
    let cartCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("cart="))
    ?.split("=")[1];

    data[cartHeader] = cartCookie;

    const response = await axios.post(import.meta.env.VITE_SERVER_API + "/Cart/AddToCart/", data);
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/DeleteItem",
  async (data) => {
    let cartCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("cart="))
    ?.split("=")[1];

    data[cartHeader] = cartCookie;

    const response = await axios.delete(import.meta.env.VITE_SERVER_API + "/Cart/DeleteItem/", {data});
    return response.data;
  }
);

export const editCartItem = createAsyncThunk(
  "cart/UpdateItem",
  async (data) => {
    let cartCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("cart="))
    ?.split("=")[1];

    data[cartHeader] = cartCookie;

    const response = await axios.put(import.meta.env.VITE_SERVER_API + "/Cart/UpdateItem/", data);
    return response.data;
  }
);

export const clearCart = createAsyncThunk(
  "cart/ClearCart",
  async (data) => {
    let cartCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("cart="))
    ?.split("=")[1];

    data[cartHeader] = cartCookie;

    const response = await axios.delete(import.meta.env.VITE_SERVER_API + "/Cart/ClearCart/", {data});
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: "",
    items: [],
    total: 0.00,
    isLoading: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cart = action.payload._id;
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.isLoading = false;
        state.hasError = false;
        
        document.cookie = `cart=${state.cart}; Max-Age=${cookieExpiration}; path=/`;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.cart = "";
        state.hasError = true;
        state.isLoading = false;

        document.cookie = `cart=; Max-Age=0; path=/`;
      })

    //AddToCart
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload._id;
        state.isLoading = false;
        state.hasError = false;
        
        document.cookie = `cart=${state.cart}; Max-Age=${cookieExpiration}; path=/`;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.cart = "";
        state.hasError = true;
        state.isLoading = false;

        document.cookie = `cart=; Max-Age=0; path=/`;
      })

      // RemoveFromCart
      builder
      .addCase(removeFromCart.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload._id;
        state.isLoading = false;
        state.hasError = false

        document.cookie = `cart=${state.cart}; Max-Age=${cookieExpiration}; path=/`;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.cart = "";
        state.hasError = true;
        state.isLoading = false;

        document.cookie = `cart=; Max-Age=0; path=/`;
      })

      // EditCartItem
      builder
      .addCase(editCartItem.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(editCartItem.fulfilled, (state, action) => {
        state.cart = action.payload._id;
        state.isLoading = false;
        state.hasError = false;
        
        document.cookie = `cart=${state.cart}; Max-Age=${cookieExpiration}; path=/`
      })
      .addCase(editCartItem.rejected, (state, action) => {
        state.cart= "";
        state.isLoading = false;
        state.hasError = true;

        document.cookie = `cart=; Max-Age=0; path=/`;
      })

      // ClearCart
      builder
      .addCase(clearCart.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart = action.payload._id;
        state.isLoading = false;
        state.hasError = false;
        
        document.cookie = `cart=${state.cart}; Max-Age=${cookieExpiration}; path=/`
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.cart= "";
        state.isLoading = false;
        state.hasError = true;

        document.cookie = `cart=; Max-Age=0; path=/`;
      })
  },
})

export const selectCartId = state => state.cart.cart;
export const selectCartLoadingState = state => state.cart.isLoading;
export const selectCartErrorState = state => state.cart.hasError;

export default cartSlice.reducer;