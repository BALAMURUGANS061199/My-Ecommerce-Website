import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigations from './Components/Navigations';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/pages/Home';
import Login from './Components/pages/Login';
import Signup from './Components/pages/Signup';
import { useSelector } from 'react-redux';
import NewProduct from './Components/pages/Newproduct';
import ProductPage from './Components/pages/ProductPage';
import CategoryPage from './Components/pages/CategoryPage';
import ScrollToTop from './Components/ScrollToTop';
import CartPage from './Components/pages/CartPage';
function App() {
  const user =useSelector((state)=> state.user)
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop/>
        <Navigations />
        <Routes>
          <Route index element={<Home />} />
          {!user && (
            <>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            </>
          )}
          {user && (
          <Route path='/cart' element={<CartPage />} />

          )}
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/new-product' element={<NewProduct />} />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
