import HeaderCartButton from "./HeaderCartButton";

import styles from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";

interface HeaderProps {
  onShowCart: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>Healthy Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="Healthy food" />
      </div>
    </>
  );
};
export default Header;
