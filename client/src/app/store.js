import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/productsSlice'
import userReducer from '../features/userSlice'
import chartReducer from '../features/chartSlice'

export default configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    chart: chartReducer
  }
})
