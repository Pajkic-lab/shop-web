import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getSmartphones, addProduct, deleteProduct, handleSetInitialState } from '../features/productsSlice'
import { selectProducts } from '../features/productsSlice'
import { selectUser } from '../features/userSlice'
import {useDropzone} from 'react-dropzone'
import ReactPaginate from 'react-paginate'

import "../css/body.css"



const Smartphone = () => {

    const dispatch = useDispatch()

    const { isAuthenticated } = useSelector(selectUser)
    
    const {smartphones} = useSelector(selectProducts)

    const [formData, setFormData] = useState({
      name: '',
      price: '',
      description: ''
    })

    const { name, price, description } = formData

    const [files, setFiles] = useState([])

    const [pag, setPag] = useState({
      limit: 10,
      page: 0 
    })

    const { limit, page } = pag
    
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          )
        },
      })


    const onChange = e => {setFormData({
      ...formData, [e.target.name]: e.target.value
    })}
    
    const onSubmit = e => {
      e.preventDefault()
      if(files[0]) {
        const file = files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          dispatch(addProduct({name, description, price, img: reader.result}))
        }
        setFormData({ ...formData, name: '', description: '' })
        setFiles([]) 
      } else {
        alert('add product img')
      }
    }

    const delProd = (pi) => {
      if (window.confirm('Are you sure?')){
      dispatch(deleteProduct(pi))
      }
    }

    
    const handlePageClick = (e) => {
      const selectedPage = e.selected
      setPag({ ...pag, page: selectedPage})
    }

     useEffect(() => {
        dispatch(getSmartphones({limit, page}))
        dispatch(handleSetInitialState())
        //eslint-disable-next-line
    },[page])

    const images = files.map((file) => (
      <div key={file.name}>
        <div>
          <img src={file.preview} style={{ width: "220px" }} alt="preview" />
        </div>
      </div>
    ))

    return (
        <div className="container">

            { isAuthenticated===true? (
                
                <div className='card-add' >
                  <p>drop zone</p>
                <div className="drop-zone" {...getRootProps()}>
                    <input {...getInputProps()} />
                       
                        <div>{images}</div>
                </div>

                <div className='form-admin'>
                  <form onSubmit={onSubmit}>
                    <span>descripton of product</span><br/><br/>
                    <input name='name' onChange={onChange} value={name} placeholder='product name' required /> <br/><br/>
                    <input name='price' onChange={onChange} value={price} type='number' placeholder='price' required /><br/>
                    <span>price is alredy denominatetd in $ just add number</span> <br/><br/>
                    <textarea name='description' onChange={onChange} value={description} placeholder='product description' required rows="9" cols="50" /> <br/><br/>
                    <button>submit</button>
                  </form>
                </div>
                
                </div>
            ) : ('') }

            {smartphones && smartphones.map(phone=>
            <div className="card" key={phone.public_id}>
              <Link to={`/product/${phone.id}`}>
                <img src={phone.url} alt="img" />
              </Link>
                <p>{phone.name}</p> <br/>
                <p>{phone.price}$</p>

                { isAuthenticated===true? <button onClick={()=>delProd(phone.public_id)}>delete</button> : '' }
            </div>
                )}

                  <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>

        </div>
    )
}

export default Smartphone