import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const cookieExpiration = 86400;       // One day

export const userSignup = createAsyncThunk(
  "user/UserRegistration",
  async (data) => {
    const response = await axios.post(import.meta.env.VITE_SERVER_API + "/User/UserRegistration/", data);
    return response.data;
  }
);

export const userLogin = createAsyncThunk(
  "user/UserLogin",
  async (data) => {
    const response = await axios.post(import.meta.env.VITE_SERVER_API + "/User/UserLogin/", data);
    return response.data;
  },
);

export const verifyToken = createAsyncThunk(
  "user/VerifyToken",
  async () => {
    let token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

    const response = await axios.get(import.meta.env.VITE_SERVER_API + "/User/VerifyToken", {headers: {Authorization: token}});
    return response.data;
  }
)

export const userLogout = createAsyncThunk(
  "user/UserLogout",
  async () => {
    document.cookie = "token=; Max-Age=0; path=/"
    return "";
  }
)

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: "",
    isLoading: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
      state.isLoading = true;
      state.hasError = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        console.log("Login good")
        state.value = action.payload;
        state.isLoading = false;
        state.hasError = false;

        document.cookie = `token=${state.value}; Max-Age=${cookieExpiration}; path=/`;
      })
      .addCase(userLogin.rejected, (state, action) => {
        console.log("Error login")
        state.hasError = true
        state.isLoading = false;
      })

      builder
      .addCase(userSignup.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.value = action.payload;
        state.isLoading = false;
        state.hasError = false

        document.cookie = `token=${state.value}; Max-Age=${cookieExpiration}; path=/`;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.hasError = true
        state.isLoading = false;
      })

      builder
      .addCase(verifyToken.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.value = action.payload;
        state.isLoading = false;
        state.hasError = false;
        
        document.cookie = `token=${action.payload}; Max-Age=${cookieExpiration}; path=/`
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.value= "";
        state.isLoading = false;
        state.hasError = true;

        document.cookie = "token=; Max-Age=0; path=/";
      })
      
      builder
      .addCase(userLogout.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
        document.cookie = "token=; Max-Age=0; path=/";
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.value = "";
        state.isLoading = false;
        state.hasError = false;
        
        document.cookie = "token=; Max-Age=0; path=/";
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.value= "";
        state.isLoading = false;
        state.hasError = true;

        document.cookie = "token=; Max-Age=0; path=/";
      })
  },
})

export const selectToken = state => state.token.value;
export const selectLoadingState = state => state.token.isLoading;
export const selectErrorState = state => state.token.hasError;

export default tokenSlice.reducer;