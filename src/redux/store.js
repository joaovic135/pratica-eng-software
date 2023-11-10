import { combineReducers, configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import produtosSlice from './produtosSlice';
import CarrinhoSlice from './carrinhoSlice';
import historicoComprasSlice from './historicoComprasSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  produtos: produtosSlice,
  carrinho: CarrinhoSlice,
  historicos: historicoComprasSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
