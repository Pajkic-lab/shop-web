import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    smartphones: [],
    productInspection: null
  },
  reducers: {
    handleAddProduct: (state, action)=> {
      return { ...state, smartphones: [action.payload, ...state.smartphones]}
    },
    hnadleGetSmartphones: (state, action) => {
      return { ...state, smartphones: action.payload}
    },
    handleDeleteProduct: (state, action) => {
      return { ...state, smartphones: state.smartphones.filter(sm=> sm.public_id !== action.payload)}
    },
    handleSetInitialState: state => {
      return { ...state, productInspection: null }
    },
    handleGetProduct: (state, action) => {
      return { ...state, productInspection: action.payload }
    }
  }
})

export const { hnadleGetSmartphones, handleSetInitialState,
   handleAddProduct, handleDeleteProduct, handleGetProduct } = productsSlice.actions


export const getSmartphones = ({limit, page}) => async dispatch => {
  const res = await axios.get(`/smartphones?page=${page}&limit=${limit}`) 
  dispatch(hnadleGetSmartphones(res.data))
}

export const setInitialState = () => dispatch => {
  dispatch(handleSetInitialState())
}

export const addProduct = ({name, price, description, img}) => async dispatch => {
  const res = await axios.post('/smartphones', {name, price, description, img})
  dispatch(handleAddProduct(res.data))
}

export const deleteProduct = (pid) => async dispatch => {
  const res = await axios.post('/smartphones/delete', {pid})
  dispatch(handleDeleteProduct(res.data))
}

export const getProduct = (id) => async dispatch => {
  const res = await axios.post('/product', {id})
  dispatch(handleGetProduct(res.data))
}

export const selectProducts = state => state.products;

export default productsSlice.reducer;