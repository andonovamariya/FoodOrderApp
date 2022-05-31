import { useContext } from "react";

import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

import styles from "./MealItem.module.css";
import { MealData } from "./MealData";

const MealItem: React.FC<MealData> = (props) => {
  const cartCtx = useContext(CartContext);
  const price: number = parseFloat(props.price);

  const addToCartHandler = (amount: number): void => {
    cartCtx!.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: price
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};
export default MealItem;
