import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import styles from "./Cart.module.css";

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = (props) => {
  const [isCheckoutVisible, setCheckoutVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [didSubmit, setDidSubmit] = useState<boolean>(false);

  const cartCtx = useContext(CartContext);

  const [httpError, setHttpError] = useState(null);

  const totalAmount: string = `$${cartCtx!.totalAmount.toFixed(2)}`;
  const hasItems: boolean = cartCtx!.items.length > 0;

  const cartItemRemoveHandler = (id: string): void => {
    cartCtx?.removeItem(id);
  };
  const cartItemAddHandler = (item: any): void => {
    cartCtx?.addItem(item);
  };

  const showCheckoutFormHandler = () => {
    setCheckoutVisible(true);
  };

  const confirmOrderHandler = (userData: {}) => {
    setIsSubmitting(true);
    const submitOrder = async () => {
      const response: Response = await fetch(
        "https://fetching-with-custom-hooks-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx!.items,
          }),
        }
      );
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx!.clearCart();

      if (!response.ok) {
        throw new Error(
          "An error occured when trying to send the data to the server."
        );
      }
    };

    submitOrder().catch((error) => {
      setHttpError(error.message);
    });

    if (httpError) {
      return (
        <section className={styles.submittionFetchingError}>
          <p>{httpError}</p>
        </section>
      );
    }
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

  const modalCartActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={showCheckoutFormHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModelContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckoutVisible && (
        <Checkout onConfirm={confirmOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckoutVisible && modalCartActions}
    </>
  );

  const isSubmitigModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent your order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModelContent}
      {isSubmitting && isSubmitigModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;
