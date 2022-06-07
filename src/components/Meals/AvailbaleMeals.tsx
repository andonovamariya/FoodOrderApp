import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { MealData } from "./MealItem/MealData";
import { useEffect, useState } from "react";

import styles from "./AvailableMeals.module.css";

const AvailableMeals: React.FC = () => {
  const [meals, setMeals] = useState<MealData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response: Response = await fetch(
        "https://fetching-with-custom-hooks-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong with fetching the meals data.");
      }

      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.mealsLoading}>
        <p>Loading meals...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.fetchingError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal: MealData) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
