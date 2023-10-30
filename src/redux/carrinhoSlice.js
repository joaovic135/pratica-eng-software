import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carrinho: [],
    total: 0,
};

const Total = (arr) =>{
    var resultado = arr.reduce((carrinho,produto) =>{
        return carrinho + produto.quantidade * parseFloat(produto.preco)
    },0);
    return resultado
}

const Carrinho = createSlice({
    name: 'carrinho',
    initialState,
    reducers: {
        adicionarProduto: (state, action) => {
            const itemProduto = state.carrinho.find(item => item.id === action.payload.produto.id);

            console.log("ItemProduto...:",{itemProduto});
            // Esse trecho é executado quando o produto já existe no carrinho
            if (itemProduto) {
                
                const carrinho = state.carrinho.map(item => {
                    if (item.id === itemProduto.id) {
                        // retorna o produto com a quantidade atualizada
                        return {...item, quantidade: action.payload.produtoCounter};
                    }
                    return item;
                });

                return {...state, carrinho, total: Total(carrinho)};
            }

            // Esse trecho é executado quando o produto não existe no carrinho
            const carrinhoObj = {...action.payload.produto, quantidade: action.payload.produtoCounter};
            console.log({carrinhoObj});
            const valor = [...state.carrinho]
            console.log("carrinhoValor:" , valor)
            valor.push(carrinhoObj)
            console.log(state.carrinho, valor, Total(valor))
            return {...state, carrinho: valor, total: Total(valor)};
        },

        removerProduto: (state, action) => {
            console.log("action.payload.id:",action.payload.id)
            // Esse trecho é executado quando o produto já existe no carrinho
            const novoCarrinho = state.carrinho.filter(item => item.id !== action.payload.id);
            return {...state, carrinho: novoCarrinho, total: Total(novoCarrinho)};
        },

        limparCarrinho: (state) => initialState
    }
});

export const { adicionarProduto, removerProduto, limparCarrinho } = Carrinho.actions;
export default Carrinho.reducer;