import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { log, selectUser } from '../features/userSlice'

import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import "../css/login.css"



const Login = ({history}) => {

    const [formData, setFormData] = useState({
        email: 'admin@gmail.com',
        password: '1234567',
    })

    const{email, password} = formData

    const onChange = e => {setFormData({
        ...formData, 
        [e.target.name]: e.target.value
    })}

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()
        dispatch(log({email, password}))
        setFormData({ ...formData, email:'', password:''})
    }

    const { isAuthenticated } = useSelector(selectUser)
    if(isAuthenticated===true){
        history.push('/')
    }

    //alert("By registering as Admin you'll be abel to arange products");

    return (
        <div className="login-page">

            <div className="form">
            <h1>Login as admin</h1> <br/> <br/>
            <form onSubmit={onSubmit}>
                <TextField onChange={onChange} variant="outlined" name='email' value={email} required label="email" /><br/> <br/>
                <TextField onChange={onChange} variant="outlined" name='password' value={password} required label="password" /><br/> <br/>
                <Button type="submit" variant="contained" color="primary">LOGIN</Button>
            </form> 
            </div>  

            <br/><br/>
            <span>admin email: admin@gmail.com</span> <br/>
            <span>admin password: 1234567</span>

        </div>

    )
}

export default Login
