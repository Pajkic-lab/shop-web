import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import setAuthToken from '../setAuthToken'

export const userSlice = createSlice({
    name: 'user',
    initialState:  {
        token: localStorage.getItem('token'),
        user: null,
        isAuthenticated: false,
        error: null
    },
    reducers: {
        handleLogin: (state, action) => {
            localStorage.setItem('token', action.payload.token)
            return { ...state, isAuthenticated: true, token: action.payload.token }
        },
        handleLogout: (state) => {
            localStorage.removeItem('token')
            return { ...state, isAuthenticated: false, user: null, token: null }
        },
        handleGetuser: (state, action) => {
            return { ...state, isAuthenticated: true, user: action.payload }
        },
        handleError: (state, action) => {
            const err = action.payload
            return { ...state, error: err }
        },
        handleRemoveError: (state) => {
            return { ...state, error: null }
        }
    }
})

export const { handleRegister, handleLogin, handleLogout, handleGetuser, handleError, handleRemoveError, tempSetUser } = userSlice.actions 


export const log = ({email, password}) => async dispatch => {
    try {
        const res = await axios.post('/auth', {email, password})
        dispatch(handleLogin(res.data))
    } catch (err) {
        const error = err.response.data.error
        dispatch(handleError(error))
    }
}

export const remove = () => async dispatch => {
    if (window.confirm('Are you sure?')){
        dispatch(handleLogout())
    }
}

export const getUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/auth')
        dispatch(handleGetuser(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const removeErr = () => dispatch => {
    dispatch(handleRemoveError())
}


export const selectUser = state => state.user

export default userSlice.reducer