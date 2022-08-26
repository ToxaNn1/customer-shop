import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
    "fetch/product",
    async function (_, { getState, dispatch, rejectWithValue }) {
        try {
            const response = await fetch("https://fakestoreapi.com/products");

            const data = await response.json();

            if (!response.ok) {
                throw new Error("my error");
            }
            return data;
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

const initialState = {
    product: [],
    purchase: [],
    favorite: [],
    history: [],
    loading: false,
    erorr: null,
    filtered: [],
};

const productsSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addFavorite(state, action) {
            state.favorite.push(action.payload);
        },
        deleteFromFavorite(state, action) {
            state.favorite = state.favorite.filter((item) => item.id !== action.payload);
        },
        deleteProduct(state, action) {
            state.purchase = state.purchase.filter((item) => item.id !== action.payload);
        },
        addProduct(state, action) {
            state.purchase.push(action.payload);
        },
        clearProduct(state) {
            state.history = [...state.purchase, ...state.history];
            state.purchase = [];
        },
        clearProductNoAuth(state) {
            state.history = [];
            state.purchase = [];
        },
        filterProducts(state, action) {
            let temp = {};
            state.filtered = [
                ...state.product.filter((product) => product.category === action.payload),
                ...state.filtered,
            ];
            state.filtered = state.filtered.filter(({ id }) => !temp[id] && (temp[id] = 1));
        },
    },
    extraReducers: {
        [fetchProduct.pending]: (state) => {
            state.loading = true;
            state.erorr = null;
        },
        [fetchProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        [fetchProduct.rejected]: (state, action) => {
            state.error = null;
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    filterProducts,
    clearProduct,
    addProduct,
    deleteProduct,
    addFavorite,
    clearProductNoAuth,
    deleteFromFavorite,
} = productsSlice.actions;
export default productsSlice.reducer;
