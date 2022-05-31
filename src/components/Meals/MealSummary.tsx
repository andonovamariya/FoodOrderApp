import styles from "./MealsSummary.module.css";

const MealSummary: React.FC = () => {
  return (
    <section className={styles.summary}>
      <h2>Delicious and healthy food by Mariya</h2>
      <p>
        “Cooking is not difficult. Everyone has taste, even if they don't
        realize it. Even if you're not a great chef, there's nothing to stop you
        understanding the difference between what tastes good and what doesn't.”
        - Gerard Depardieu
      </p>
    </section>
  );
};
export default MealSummary;
