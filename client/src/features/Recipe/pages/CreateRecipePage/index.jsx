import React, { useEffect, useState } from 'react';
import CreateRecipeForm from '../../components/CreateRecipeForm';
import recipeApi from 'api/recipeApi';
import categoryApi from 'api/categoryApi';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { storage } from '../../../../firebase';

export default function CreateRecipePage() {
  const history = useHistory();
  const userId = useSelector((state) => state.userAuth.id);
  const email = useSelector((state) => state.userAuth.email);

  const [categories, setCategories] = useState([]);
  const [progress, setProgress] = useState(0);
  const [imgURL, setImgURL] = useState('');

  useEffect(() => {
    setProgress((prevProgress) =>
      prevProgress >= 100 ? 10 : prevProgress + 10
    );
  }, []);

  const uploadRecipeImgURL = async (url) => {
    const response = await recipeApi.createRecipe({
      coverImage: url,
      authorId: userId,
    });
    console.log(response);
  };

  const uploadRecipeImage = async (file) => {
    const uploadTask = storage
      .ref(`recipes/${email}/recipe/${file.name}`)
      .put(file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`recipes/${email}/recipe/`)
          .child(file.name)
          .getDownloadURL()
          .then(async (url) => {
            setImgURL(url);
            uploadRecipeImgURL(url);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

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
    try {
      const submitRecipe = async () => {
        const response = await recipeApi.createRecipe({
          ...values,
          authorId: userId,
        });
        console.log(response);
      };
      submitRecipe();
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <CreateRecipeForm
        onSubmitRecipe={onSubmitRecipe}
        categories={categories}
        progress={progress}
        uploadRecipeImage={uploadRecipeImage}
        imgURL={imgURL}
      />
    </div>
  );
}
