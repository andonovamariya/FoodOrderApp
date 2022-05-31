import classes from "./CartItem.module.css";

export interface CartItemProps {
  price: string;
  name: string;
  amount: number;
  onRemove: () => void;
  onAdd: () => void;
}

const CartItem: React.FC<CartItemProps> = (props: CartItemProps) => {
  const price: string = `$${parseFloat(props.price).toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
