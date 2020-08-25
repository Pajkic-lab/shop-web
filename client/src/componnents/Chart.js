import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectChart, removeFromCart, sendEmail, resetCart } from '../features/chartSlice'

import '../css/cart.css'
import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'



const Chart = ({history}) => {

    const {products} = useSelector(selectChart)

    const dispatch = useDispatch()

    const ob1 = Object.assign(products)
    const [...arr1] = ob1.map(ob=> ob.price* ob.count)
    const total = arr1.reduce((a, b) => a + b, 0)

    const [formData, setFormData] = useState({
        switcher: false,
        email: '',
        phone: '',
        addres: ''
    })

    const { switcher, email, phone, addres } = formData

    const onClick = e => {
        e.preventDefault()
        setFormData({...formData, switcher: !switcher})
    }

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        //dispatch(sendEmail({email, phone, addres, total, products}))
        setFormData({...formData, email:'', phone:'', addres:'', switcher: !switcher})
        dispatch(resetCart())
        history.push('/')
    }


    return (
        <div className='cart-container'>
            
            { products && products.map(prod=> 
            <div className='cart-card' key={prod.id}>
            <p id='name'>{prod.name}</p>
            <p id='count'>number of product: {prod.count}</p>
            <p id='price'>price:{prod.count* prod.price}$</p>
            <img src={prod.url} style={{width: "100px"}} />
            <Button id='btn' type="submit" variant="outlined" 
            onClick={()=>dispatch(removeFromCart(prod.id))}>
                remove from cart
            </Button>
            </div>
            )
            }

            {total? <div>
                <h1 id='tn'>total amount:{total} $</h1>
                <Button onClick={onClick} type="submit" variant="outlined">proceed with payment</Button>
            </div> : ''}

            {switcher===true? 
            <div className='payment-form'>
                <p>verification email will be sent to your email addres</p><br/>
                <form onSubmit={onSubmit}>
                    <TextField variant="outlined" onChange={onChange} placeholder="email" name="email" value={email} required /> <br/><br/>
                    <TextField variant="outlined" onChange={onChange} placeholder="phone number" name="phone" value={phone} required /> <br/><br/>
                    <TextField variant="outlined" onChange={onChange} placeholder="addres" name="addres" value={addres} required /> <br/><br/>
                    <p>total amount:{total} $</p> <br/>
                    <Button type="submit" variant="outlined">Buy</Button>
                </form>
            </div>
             : ''}
            
            {products.length<1? <div><h1>Empty cart</h1></div> : ''}
        </div>
    )
}

export default Chart
