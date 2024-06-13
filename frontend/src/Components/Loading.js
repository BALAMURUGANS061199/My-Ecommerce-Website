import React from 'react'
import { Spinner } from 'react-bootstrap'
function Loading() {
  return (
    <div className='loading-container'>
      <Spinner animation='grow'  style={{minHeight:'100vh', display:'flex', alignItems: 'center',justifyContent:'center'}}/>


    </div>
  )
}

export default Loading
  {/* Render Similar Products */}
      {/* <Row className='mt-4'>
        <Col>
          <h3>Similar Products</h3>
          <div className='similar-products-container'>
            {similarProducts.length > 0 ? similarProducts : <p>No similar products found.</p>}
          </div>
        </Col>
      </Row> */}