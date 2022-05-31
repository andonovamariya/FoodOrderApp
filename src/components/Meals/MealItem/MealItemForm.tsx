import React, { useRef, useState } from "react";

import Input from "../../UI/Input";

import styles from "./MealItemForm.module.css";

interface MealItemFormProps {
  id?: string;
  onAddToCart(enteredAmount: number): void;
}

const MealItemForm: React.FC<MealItemFormProps> = (props) => {
  const [amountValidity, setAmountValidity] = useState<boolean>(true);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredAmount: string = amountInputRef.current!.value;
    const enteredAmountNumber: number = +enteredAmount!;

    if (
      enteredAmount!.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountValidity(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };
  return ( 
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountValidity && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};
export default MealItemForm;
