import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    historicoCompras: [],
};

const HistoricoCompras = createSlice({
    name: 'historicoCompras',
    initialState,
    reducers: {
        adicionarCompraHistorico: (state, action) => {
            const {usuarioId, compras} = action.payload;

            const historico = state.historicoCompras.find(item => item.usuarioId === usuarioId);
            
            if (historico) {
                historico.comprasUsuario.carrinhos.push(compras);
            } else {
                state.historicoCompras.push({
                    usuarioId,
                    comprasUsuario: {
                        carrinhos: [compras]
                    }
                });
            }


        },
    }
});


export const { adicionarCompraHistorico} = HistoricoCompras.actions;
export default HistoricoCompras.reducer;