import { useState } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from './store/CartProvider';

const App: React.FC = () => {
  const [cartVisibility, setCartVisibility] = useState<boolean>(false);

  const showCartHandler = ():void => {
    setCartVisibility(true);
  };

  const hideCartHandler = ():void => {
    setCartVisibility(false);
  };

  return (
    <CartProvider>
      {cartVisibility && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
