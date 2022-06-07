import { FormEvent, useRef, useState } from "react";
import styles from "./Checkout.module.css";

interface CheckoutProps {
  onCancel: () => void;
  onConfirm: ({}) => void;
}

const isEmpty: (value: string) => boolean = (value) => value.trim() === "";
const hasFourCharacters: (value: string) => boolean = (value: string) =>
  value.trim().length === 4;

const Checkout = (props: CheckoutProps) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    nameValidity: true,
    streetValidity: true,
    postalCodeValidity: true,
    cityValidity: true,
  });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const postalCodeInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    const enteredNameValue = nameInputRef.current!.value;
    const enteredStreetValue = streetInputRef.current!.value;
    const enteredPostalCodeValue = postalCodeInputRef.current!.value;
    const enteredCityValue = cityInputRef.current!.value;

    const enteredNameIsValid: boolean = !isEmpty(enteredNameValue);
    const enteredStreetIsValid: boolean = !isEmpty(enteredStreetValue);
    const enteredPostalCodeIsValid: boolean = hasFourCharacters(
      enteredPostalCodeValue
    );
    const enteredCityIsValid: boolean = !isEmpty(enteredCityValue);

    setFormInputsValidity({
      nameValidity: enteredNameIsValid,
      streetValidity: enteredStreetIsValid,
      postalCodeValidity: enteredPostalCodeIsValid,
      cityValidity: enteredCityIsValid,
    });

    const isFormValid: boolean =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;

    if (!isFormValid) {
      return;
    }

    props.onConfirm({
      name: enteredNameValue,
      street: enteredStreetValue,
      postalCode: enteredPostalCodeValue,
      city: enteredCityValue,
    });
  };

  const nameInputStyling: string = `${styles.control} ${
    formInputsValidity.nameValidity ? "" : styles.invalid
  }`;
  const streetInputStyling: string = `${styles.control} ${
    formInputsValidity.streetValidity ? "" : styles.invalid
  }`;
  const postalCodeInputStyling: string = `${styles.control} ${
    formInputsValidity.postalCodeValidity ? "" : styles.invalid
  }`;
  const cityInputStyling: string = `${styles.control} ${
    formInputsValidity.cityValidity ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <div className={nameInputStyling}>
        <label htmlFor="name">Name and surname:</label>
        <input type="text" id="name" ref={nameInputRef} />
      </div>
      <div className={streetInputStyling}>
        <label htmlFor="street">Street:</label>
        <input type="text" id="street" ref={streetInputRef} />
      </div>
      <div className={postalCodeInputStyling}>
        <label htmlFor="postal-code">Postal code:</label>
        <input type="text" id="postal-code" ref={postalCodeInputRef} />
      </div>
      <div className={cityInputStyling}>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" ref={cityInputRef} />
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
