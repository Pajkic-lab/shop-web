import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, remove } from '../features/userSlice'

import '../css/navbar.css'
import { selectChart } from '../features/chartSlice'

const Navbar = () => {

    const dispatch = useDispatch()

    const { isAuthenticated } = useSelector(selectUser)

    const {products} = useSelector(selectChart)
    
    const productNumberInCart = products.length

    return (
        <div className="navbar">
            <span><Link to='/'>web-shop</Link></span>
            <ul>
                <li className="navbar-el"><Link to='/smartphone'>smartphone</Link></li>
                
                {isAuthenticated===true? (
                    <li className="navbar-el" onClick={()=>dispatch(remove())}> logout</li>
                ) : (
                    <li className="navbar-el"><Link to='/login'>login</Link></li>
                )}

                <li className="navbar-el"><Link to='/chart'>cart: {productNumberInCart}</Link></li> 
            </ul>
        </div>
    )
}

export default Navbar
