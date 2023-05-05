import { FormatRupiah } from '@arismun/format-rupiah';
import React from 'react'
import Card from 'react-bootstrap/Card';
import styles from './FoodCard.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../Features/foot-cart/slice/foodSlice';

const FoodCard = ({data}) => {
  const dispatch = useDispatch()

  const storeToCartHandler = () => {
    dispatch(addToCart(data))
  }
  
  return (
    <Card onClick={storeToCartHandler} className='border-0 shadow pointer'>
      <Card.Img 
        className={styles.imgFoodSize} variant="top" src={data.photo} />
      <Card.Body>
        <Card.Title className='fs-6 text-center'>{data.food_name}</Card.Title>
        <Card.Title className='fs-6 text-center color-main'><FormatRupiah value={data.price} /></Card.Title>
      </Card.Body>
    </Card>
  )
}

export default FoodCard