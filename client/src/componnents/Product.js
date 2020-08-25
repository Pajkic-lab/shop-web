import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, selectProducts } from '../features/productsSlice'
import { addToChart } from '../features/chartSlice'

import '../css/product.css'
import { Button } from '@material-ui/core'

const Product = ({match, history}) => {

    const [count, setCount] = useState(1)

    const {product_public_id} = match.params

    const dispatch = useDispatch()

    const {productInspection} = useSelector(selectProducts)
    
    useEffect(()=> {
        dispatch(getProduct(product_public_id))
    }, [])

    const onClick = (prod) => {
        const ob1 = Object.assign(prod)
        const product = {count, ...ob1}
        dispatch(addToChart(product))
        history.push('/chart')
    }

    return (
        <div className='product-container'>
            { productInspection && 
            <>
            <h1>{productInspection.name}</h1>
            <img src={productInspection.url} style={{width: '300px'}}/>
            <p>{productInspection.description}</p><br/>
            <h2>{productInspection.price} $</h2><br/><br/>
            <span>number of products: {count} </span>  
            <span className='s' onClick={()=>setCount(count+1)}> + </span>
            { count<2? (<><br/><br/></>) : (<><span className='s' onClick={()=>setCount(count-1)}> - </span><br/><br/></>)
            }
            <h1>{productInspection.price*count}$</h1>
            
            <Button onClick={()=>onClick(productInspection)}
             type="submit" variant="contained" color="primary">
                 Add to Cart
            </Button>

            </>
            }
        </div>
    )
}

export default Product
