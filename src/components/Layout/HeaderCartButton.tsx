import { useContext } from "react";

import CartContext from "../../store/cart-context";
import Item from "../../store/ItemPropsData";
import CartIcon from "../Cart/CartIcon";

import styles from "./HeaderCartButton.module.css";

interface PropsData {
  onClick: () => void;
}

const HeaderCartButton: React.FC<PropsData> = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems: number = cartCtx!.items.reduce(
    (currNumber: number, item: Item) => {
      return currNumber + item.amount;
    },
    0
  );

  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your cart of meals</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
