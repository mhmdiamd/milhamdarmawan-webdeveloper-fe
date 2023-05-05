import React, {useEffect, useState} from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import CheckoutTable from '../../Tables/CheckoutTable.jsx/CheckoutTable';
import { useDispatch, useSelector } from 'react-redux';
import { FormatRupiah } from '@arismun/format-rupiah';
import { useCreateTransactionMutation } from '../../../Features/transaction/transactionsApi';
import { useCreateFoodCartMutation } from '../../../Features/foot-cart/foodCartApi';
import { showLoading, successLoading } from '../../../common/loadingHandler';
import { clearCart } from '../../../Features/foot-cart/slice/foodSlice';

const CheckoutModal = ({ idModal }) => {
  const dispatch = useDispatch()
  const [customerMoney, setCustomerMoney] = useState(0)
  const [loading, setLoading] = useState(false)
  const [createTransaction, {isSuccess: isSuccessCreateTransaction, isLoading: isLoadingCreateTransaction, isError: isErrorCreateTransaction}] = useCreateTransactionMutation()

  const [createFoodCart, {isSuccess: isSuccessCreateFoodCart, isLoading: isLoadingCreateFoodCart, isError: isErrorCreateFoodCart}] = useCreateFoodCartMutation()

  const { foods } = useSelector(state => state.foodCart)

  const getTotalPrice = () => {
    let price = 0
    foods.forEach(food => {
      price = price + food.quantity * food.price
    })

    return price
  }

  const inputCustomerMoneyHandler = (money) => {
    setCustomerMoney(money)
  }

  const createTransactionHandler = async () => {
    setLoading(true)

    const { data } = await createTransaction({ data : {
        customer_money: Number(customerMoney),
        total_price: getTotalPrice()
      }
    })

    Promise.all(foods.map(async (food) => {
      await createFoodCart({data : {
        quantity: food.quantity,
        price: food.quantity * food.price,
        id_transaction: data.id
      }})

      setLoading(false)
    }))
  }

  useEffect(() => {

    if(isLoadingCreateFoodCart && loading) {
      showLoading('Tunggu sebentar transaksi sedang diperoses!')
    }

    if(isSuccessCreateTransaction && !loading) {
      successLoading('Berhasil, Terima kasih sudah memesan!')
      dispatch(clearCart())
    }

  }, [isSuccessCreateTransaction, isSuccessCreateFoodCart, loading, isLoadingCreateTransaction, isErrorCreateFoodCart])

  return (
    <div className="modal fade" id={idModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content px-4 py-3">
          <div className="modal-header border-0">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Detail Pesanan</h1>
          </div>
          <div className="modal-body">  
            <div className="row">
              <div className="col-8 pe-5 border-1 border-end">
                <CheckoutTable data={foods} operation={false}/>
              </div>
              <div className="col-4">
                <div className="row justify-content-center">
                  <div className="col-12 header-title d-flex mb-4">
                    <span className='fw-semibold mx-auto fs-5'>Uang Pembeli (Rp)</span>
                  </div>

                  <div className="col-10">
                    <InputGroup className="mb-3">
                      <Form.Control 
                        onChange={(e) => inputCustomerMoneyHandler(e.target.value)}
                        value={customerMoney}
                        type='number'
                        className='shadow-none'
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                      />
                    </InputGroup>
                  </div>

                  <div className='col-10 d-flex btn-close-pay gap-3'>
                    <button 
                      className='btn btn-dark text-dark w-100 bg-transparent' data-bs-dismiss={'modal'}>Close</button>  
                    <button onClick={createTransactionHandler} className='btn text-light bg-main w-100'>Pay</button>
                  </div>

                  <div className="col-10 mt-4 rest-money">
                    <span className='text-danger'>Kembalian : {customerMoney - getTotalPrice() > 0 ?  (
                      <FormatRupiah value={customerMoney - getTotalPrice()} />
                    ): ''}</span>
                  </div>

                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutModal