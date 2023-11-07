import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    produtos: [],
};

const produtosSlice = createSlice({
    name: 'produtos',
    initialState,
    reducers: {
        start: (state, action) => {
            state.produtos[action.payload] = 0
        },
        increment: (state, action) => {
            state.produtos[action.payload] = state.produtos[action.payload] + 1
        },
        decrement: (state, action) => {
            if (state.produtos[action.payload] > 0) {
                state.produtos[action.payload] = state.produtos[action.payload] - 1
            } else {
                state.produtos[action.payload] = 0
            }
        }
    }
});

export const { start, increment, decrement } = produtosSlice.actions;
export default produtosSlice.reducer;