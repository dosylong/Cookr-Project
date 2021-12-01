import HomeContent from 'features/Home/components/HomeContent';
import React, { useEffect, useState } from 'react';
import dishApi from 'api/dishApi';

export default function HomePage() {
  const [allDishes, setAllDishes] = useState([]);

  useEffect(() => {
    const getDish = async () => {
      try {
        const response = await dishApi.getAllDish();
        setAllDishes(response);
      } catch (error) {
        console.log(error);
      }
    };
    getDish();
  }, []);
  return (
    <div>
      <HomeContent allDishes={allDishes} />
    </div>
  );
}
