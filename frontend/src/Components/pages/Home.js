// import React, { useEffect } from 'react';
// import { Col, Row } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import Categories from '../../Categories';
// import axios from '../../axios';
// import { LinkContainer } from 'react-router-bootstrap';
// import './Home.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateProducts } from '../../features/ProductSlice';
// import ProductPreview from '../ProductPreview';

// const Home = () => {
//     const dispatch = useDispatch();
//     const products = useSelector((state) => state.product); 
//     const lastProducts = Array.isArray(products) ? products.slice(0, 8) : [];

//     useEffect(() => {
//         axios.get("/product").then(({ data }) => dispatch(updateProducts(data.product)));
//     }, []);

//     return (
//         <div>
//             <img
//                 src="https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png"
//                 className="home-banner"
//                 alt="Home Banner"
//             />
//             <div className='featured-products-container container mt-4'>
//                 <h2>Last Products</h2>
//                 {/* Last Products Here*/}
//                 <div className='d-flex justify-content-center flex-wrap'>
//                 {lastProducts.map((product) => (
                 
//                  <ProductPreview {...product} />      
              
//              ))}
//                 </div>
              
//             </div>
//             <div>
//                 <Link to='/category/all' style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}>See More {">>"}</Link>
//             </div>

//             {/* Sale Banner*/}
//             <div className='sale_banner--container mt-4'>
//                 <img
//                     src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png"
//                     alt="Sale Banner"
//                 />
//             </div>
//             <div className='recent-products-container mt-4'>
//                 <h2>Categories</h2>
//                 <Row>
//                     {Categories.map((category) => (
//                         <LinkContainer key={category.name} to={`/category/${category.name}`}>
//                             <Col md={4}>
//                                 <div
//                                     style={{
//                                         backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${category.img})`,
//                                         gap: '10px'
//                                     }}
//                                     className='category-title'
//                                 >
//                                     {category.name}
//                                 </div>
//                             </Col>
//                         </LinkContainer>
//                     ))}
//                 </Row>
//             </div>
//         </div>
//     );
// };

// export default Home;


import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Categories from '../../Categories';
import axios from '../../axios';
import { LinkContainer } from 'react-router-bootstrap';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '../../features/ProductSlice';
import ProductPreview from '../ProductPreview';

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product || []); 
    const lastProducts =  Array.isArray(products)? products.slice(0,8) : [];

    useEffect(() => {
        axios.get("/product").then(({ data }) => {
            console.log('Fetched Products:', data); 
            dispatch(updateProducts(data));
        });
    }, [dispatch]);
  if (!products) {
        return <p>Loading...</p>; // Handle loading state
    }
    return (
        <div>
            <img
                src="https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png"
                className="home-banner"
                alt="Home Banner"
            />
            <div className='featured-products-container container mt-4'>
                <h2>Last Products</h2>
                {/* Last Products Here*/}
                <div className='d-flex justify-content-center flex-wrap'>
                    {lastProducts.map((product) => (
                        <ProductPreview key={product._id} {...product} />      
                    ))}
                </div>
            </div>
            <div>
                <Link to='/category/all' style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}>See More {">>"}</Link>
            </div>

            {/* Sale Banner*/}
            <div className='sale_banner--container mt-4'>
                <img
                    src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png"
                    alt="Sale Banner"
                />
            </div>
            <div className='recent-products-container mt-4'>
                <h2>Categories</h2>
                <Row>
                    {Categories.map((category) => (
                        <LinkContainer key={category.name} to={`/category/${category.name}`}>
                            <Col md={4}>
                                <div
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${category.img})`,
                                        gap: '10px'
                                    }}
                                    className='category-title'
                                >
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Home;

