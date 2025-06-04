import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const sendTransaction = createAsyncThunk(
  'payment/sendTransaction',
  async ({ emailid, transaction }: { emailid: string; transaction: any }, thunkAPI) => {
    const res = await fetch('http://localhost:3005/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailid, transaction }),
    });
    if (!res.ok) throw new Error('Payment submission failed');
    return res.json();
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    error: null as string | null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(sendTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default paymentSlice.reducer;
