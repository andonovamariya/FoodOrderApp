import { useContext } from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

import styles from "./Cart.module.css";

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount: string = `$${cartCtx!.totalAmount.toFixed(2)}`;
  const hasItems: boolean = cartCtx!.items.length > 0;

  const cartItemRemoveHandler = (id: string): void => {
    cartCtx?.removeItem(id);
  };
  const cartItemAddHandler = (item: any): void => {
    cartCtx?.addItem(item);
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx!.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price.toString()}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
