import React, { useEffect, useState } from 'react';
import CreateRecipeForm from '../../components/CreateRecipeForm';
import recipeApi from 'api/recipeApi';
import categoryApi from 'api/categoryApi';
import { useSelector } from 'react-redux';

export default function CreateRecipePage() {
  const userId = useSelector((state) => state.userAuth.id);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      const getCategory = async () => {
        const response = await categoryApi.getCategory();
        setCategories(response);
      };
      getCategory();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSubmitRecipe = (values) => {
    // try {
    //   const submitRecipe = async () => {
    //     const response = await recipeApi.createRecipe({
    //       ...values,
    //       authorId: userId,
    //     });
    //     console.log(response);
    //   };
    //   submitRecipe();
    // } catch (error) {
    //   console.log(error);
    // }
    console.log(values);
  };
  return (
    <div>
      <CreateRecipeForm
        onSubmitRecipe={onSubmitRecipe}
        categories={categories}
      />
    </div>
  );
}
