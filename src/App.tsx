import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { SearchProvider } from './context/SearchContext'
import { OrderProvider } from './context/OrderContext'
import Header from './components/Header'
import Cart from './components/Cart'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductPage from './pages/ProductPage'
import Support from './pages/Support'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import Account from './pages/Account'
import Privacy from './pages/Privacy'
import Oferta from './pages/Oferta'
import OrderSuccess from './pages/OrderSuccess'

export default function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <div className="min-h-screen flex flex-col bg-cream">
                <Header />
                <Cart />
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/concept" element={<Concept />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/oferta" element={<Oferta />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </SearchProvider>
    </BrowserRouter>
  )
}
