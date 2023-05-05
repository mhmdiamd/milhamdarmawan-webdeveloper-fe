import React from 'react'
import styles from './OrderListFoodCard.module.css'
import { FormatRupiah } from '@arismun/format-rupiah'

const OrderListFoodCard = ({data}) => {
  return (
    <div className="row list-food">
      <div className="col-4 image-food">
        <img className={`${styles.imgSize} w-100 rounded img-fluid`} 
          src={data.photo} alt="" />
      </div>

      <div className="col-4 d-flex align-items-center">
        <span className='fw-semibold'>{data.food_name}</span>
      </div>

      <div className="col-1 d-flex align-items-center">
        <span className='fw-semibold'>x{data.quantity}</span>
      </div>

      <div className="col-3 d-flex align-items-center">
        <span className='fw-semibold color-main'>
          <FormatRupiah value={data.quantity * data.price}/>
        </span>
      </div>
    </div>
  )
}

export default OrderListFoodCard