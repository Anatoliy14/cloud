import React, { useState } from 'react';
import { CartProvider } from 'react-use-cart';
import ProductList from './pages/ProductList/ProductList';
import Header from './pages/Header/Header';
import Cart from './pages/Cart/Cart';
import OrderModal from './pages/OrderModal/OrderModal';
import s from './App.module.scss'

function App() {
  const [isCartOpen, setCartOpen] = useState(false); 
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const toggleOrderModal = () => {
    setOrderModalOpen(!isOrderModalOpen);
  };



  return (
    <CartProvider>
    <Header onCartClick={toggleCart} />
      <main>
        <h1 className={s.catalogTitle}>Каталог</h1>
        <ProductList />
      </main>
      <Cart open={isCartOpen} onClose={toggleCart} onOrderClick={toggleOrderModal} />
      <OrderModal open={isOrderModalOpen} onClose={toggleOrderModal}  />
    </CartProvider>
  );
}

export default App;
