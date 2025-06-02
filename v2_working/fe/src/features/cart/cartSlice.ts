import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartItem } from '../../types/cart';

const API = 'http://localhost:3002/cart';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (uid: string) => {
    const res = await axios.get<CartItem[]>(`${API}/${uid}`);
    return res.data;
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (payload: { uid: string; pid: string | any }) => {
    const res = await axios.post(`${API}`, payload);
    return res.data;
  }
);

export const incrementCart = createAsyncThunk(
  'cart/incrementCart',
  async (cid: string) => {
    const res = await axios.patch(`${API}/inc/${cid}`);
    return { cid };
  }
);

export const decrementCart = createAsyncThunk(
  'cart/decrementCart',
  async (cid: string) => {
    const res = await axios.patch(`${API}/dec/${cid}`);
    return { cid };
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (cid: string) => {
    await axios.delete(`${API}/${cid}`);
    return cid;
  }
);

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load cart';
      })
      .addCase(addToCart.fulfilled, () => {})
      .addCase(incrementCart.fulfilled, () => {})
      .addCase(decrementCart.fulfilled, () => {})
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  }
});

export default cartSlice.reducer;
