import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import dishApi from 'api/dishApi';
import DishDetail from 'features/Dish/components/DishDetail';
import { useSelector } from 'react-redux';

export default function DishDetailPage() {
  const { dishSlug } = useParams();
  const [dishDetail, setDishDetail] = useState([]);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await dishApi.getDishDetail({
          dishSlug: dishSlug,
        });
        setDishDetail(response);
      } catch (error) {
        console.log(error);
      }
    };
    getDetail();
  }, [dishSlug]);

  return (
    <div>
      <DishDetail dishDetail={dishDetail} />
    </div>
  );
}
