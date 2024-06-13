import React, { useEffect, useState } from 'react'
import {Row,Col,Container} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from '../../axios'
import Loading from '../Loading'
import ProductPreview from '../ProductPreview'
import './CategoryPage.css'
const CategoryPage = () => {
  
    const {category} =useParams();
    const [isLoading,setisLoading] =useState(false)
    const [product,setproduct] =useState([])
    const [searchTerm,setsearchTerm] =useState('')

    useEffect(()=>{
        setisLoading(true);
        axios.get(`product/category/${category}`).then(({data})=>{
            setisLoading(false);
            setproduct(data)
        }).catch((e)=>{
            setisLoading(false);
            console.log(e.message);
        })
    },[category])

    if(isLoading){
        <Loading/>
    }

const productSearch =product.filter((product)=>product.name.toLowerCase().includes(searchTerm))

    return (
        <>
    <div className='category-page-container'>
      <div className={`pt-3 ${category}-banner-container category-banner-container`}>
        <h1 className='text-center'>{category.charAt(0).toUpperCase() +category.slice(1)}</h1>
      </div>
      <div className='filter-container d-flex justify-content-center pt-4 pb-4'>
<input type='search' placeholder='Search' onChange={(e)=>setsearchTerm(e.target.value)} />
      </div>
    </div>
{productSearch.length === 0 ? <h1>No Products Found</h1> :<Container>
<Row>
<Col md={{span:10,offset:1}}>

    <div className='d-flex align-items-center justify-content-center flex-wrap'>
    {productSearch.map(product =><ProductPreview  key={product._id}{...product}/>)}
    </div>
    </Col>
</Row>
</Container>
}
   </>
  )
 
}

export default CategoryPage
