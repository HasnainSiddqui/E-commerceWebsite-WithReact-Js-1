import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './component/header'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import AuthContextProvide from './context/usecontext'
import { ProductDetail } from './pages/productDetail'
import { Footer } from './component/footer'
import { About } from './pages/about'
import { CartItemContextProvider } from './context/cartContext'

function App() {


  return (

    <>
      
        <AuthContextProvide>
        <CartItemContextProvider>
          <BrowserRouter >
            <Header />

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/productDetail/:id' element={<ProductDetail />} />
              <Route path='login' element={<Login />} />
              <Route path='login/signup' element={<Signup />} />
              <Route path='about' element={<About />} />
            </Routes>
            <Footer />
          </BrowserRouter>
          </CartItemContextProvider>
        </AuthContextProvide>
      
    </>
  )
}

export default App
