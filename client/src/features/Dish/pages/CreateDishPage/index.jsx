import dishApi from 'api/dishApi';
import CreateDishForm from 'features/Dish/components/CreateDishForm';
import React from 'react';
import { useSelector } from 'react-redux';

export default function CreateFoodPage() {
  const currentUserId = useSelector((state) => state.userAuth.id);
  const onCreateDish = async (values) => {
    try {
      const createFormData = {
        ...values,
        authorId: currentUserId,
      };
      console.log(createFormData);
      const response = await dishApi.createDish(createFormData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CreateDishForm onCreateDish={onCreateDish} />
    </div>
  );
}
