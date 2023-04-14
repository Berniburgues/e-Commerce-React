import { createSlice } from '@reduxjs/toolkit';
import { getPurchases } from '../../services/getPurchases';

const initialState = {
  purchases: [],
  loading: false,
};

const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    setPurchasesLoading(state, action) {
      state.loading = action.payload;
    },
    setPurchases(state, action) {
      state.purchases = action.payload;
    },
  },
});

const { setPurchasesLoading, setPurchases } = purchasesSlice.actions;

export const loadPurchases = (token) => async (dispatch) => {
  dispatch(setPurchasesLoading(true));

  const purchases = await getPurchases(token);

  dispatch(setPurchases(purchases));

  dispatch(setPurchasesLoading(false));
};

export default purchasesSlice.reducer;
