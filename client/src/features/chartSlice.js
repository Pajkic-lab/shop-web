import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const chartSlice = createSlice({
  name: 'chart',
  initialState: {
      products: []
  },
  reducers: {
    handleAddToChart: (state, action)=> {
      if(state.products.length<1){
        return { ...state, products: state.products.concat(action.payload) }
      } else {
        const arr1 = state.products.map(el=> el.id) 
        const arr2 = arr1.filter(el=> el===action.payload.id)
        console.log(arr2.length)
        if(arr2.length<0 || arr2.length===0) {
          return { ...state, products: state.products.concat(action.payload) }
        }
      }
    },
    handleremoveFromCart: (state, action)=> {
        return { ...state, products: state.products.filter(prod=> prod.id !== action.payload)}
    },
    handleResetCard: state=> {
        return { ...state, products: [] }
    }
  }
})

export const { handleAddToChart, handleremoveFromCart, handleResetCard } = chartSlice.actions


export const addToChart = (prod) => dispatch => {
  dispatch(handleAddToChart(prod))
}

export const removeFromCart = (id) => dispatch => {
    dispatch(handleremoveFromCart(id))
}

export const sendEmail = (data) => async dispatch => {
    await axios.post('/email', data)
}

export const resetCart = () => dispatch => {
  dispatch(handleResetCard())
}


export const selectChart = state => state.chart

export default chartSlice.reducer;