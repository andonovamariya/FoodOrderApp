import { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
}

const Card = (props: CardProps) => {
  return <div className={styles.card}>{props.children}</div>;
};

// const Card: React.FC<React.PropsWithChildren<{props.children}>>;

export default Card;
