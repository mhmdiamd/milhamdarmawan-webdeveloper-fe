import React, { useRef } from 'react'
import Card from 'react-bootstrap/Card';
import styles from './OrderCard.module.css'
import profile from '../../../assets/profile.png'
import OrderListFoodCard from '../OrderListFoodCard/OrderListFoodCard';
import { FormatRupiah } from '@arismun/format-rupiah';
import CheckoutModal from '../../Modals/CheckoutModal/CheckoutModal';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../../Features/foot-cart/slice/foodSlice';
import { successLoading } from '../../../common/loadingHandler';
import { useReactToPrint } from 'react-to-print';

const OrderCard = () => {
  const dispatch = useDispatch()
  const { foods } = useSelector(state => state.foodCart)
  const componentPDF = useRef()

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: 'List Bill',
  })

  const clearCartHandler = () => {
    localStorage.removeItem('bill')
    dispatch(clearCart())
  }

  const priceCalculation = () => {
    let price = 0
    foods.forEach(food => {
      price = price + (food.price * food.quantity)
    })

    return price
  }

  const savedBillHandler = () => {
    localStorage.setItem('bill', JSON.stringify(foods))
    successLoading('Succes saved to bill!')
  }

  return (
    <>
      <Card className='w-100 border-0 shadow p-2 px-3'>
        <Card.Body>
          <Card.Title className='d-flex justify-content-center align-items-center mb-5'>
            <img src={profile} alt="" className={styles.imageSize} />
            <span className='fs-3 fw-semibold ms-3'>Pesanan</span>
          </Card.Title>

          <div className="card-content d-flex flex-column gap-3">

            <div ref={componentPDF} className='w-100 d-flex flex-column gap-3'>
              {foods.map((food, i) => <OrderListFoodCard key={i} data={food}/>)}
            </div>

            <button onClick={clearCartHandler} className="btn btn-danger mt-4 border-danger text-danger bg-transparent w-100 ">Clear Cart</button>

            <div className="row">
              <div className="col-12 d-flex gap-3">
                <div onClick={savedBillHandler} className="btn bg-green border-green w-100 btn-success">Save Bill</div>
                <div onClick={generatePDF} className="btn bg-green border-green w-100 btn-success">Print Bill</div>
              </div>
            </div>

            <button data-bs-toggle={priceCalculation() <=0 ? '' : 'modal'} data-bs-target="#exampleModal" className='btn text-light py-3 bg-main fw-semibold'>
              Charge <FormatRupiah value={priceCalculation()} />
            </button>

          </div>

        </Card.Body>
      </Card>

      <CheckoutModal idModal={`exampleModal`}/>
    </>
    
  )
}

export default OrderCard