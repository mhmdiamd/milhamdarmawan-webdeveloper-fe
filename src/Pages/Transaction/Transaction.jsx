import React from 'react'
import MainTemplate from '../../Templates/MainTemplate/MainTemplate'
import FoodCard from '../../Components/Cards/FoodCard/FoodCard'
import OrderCard from '../../Components/Cards/OrderCard/OrderCard'
import { useGetAllMenuQuery } from '../../Features/food/foodApi'
import { showLoading } from '../../common/loadingHandler'
import Swal from 'sweetalert2'
import styles from './Transaction.module.css'
import notFoundPhoto from '../../assets/page-not-found.svg'

const Transaction = () => {

  const {data, isError, isSuccess, isLoading, error} = useGetAllMenuQuery()
  

  return (
    <MainTemplate>
      {isLoading ? showLoading('wait a moment, it is loading data') : (
        Swal.close(),
        <div className="row">
          {isError ? error.status == 404 && (
              <div className="errorHandler d-flex flex-column align-items-center">
                <img className={`${styles.imgSize} img-fluid`} src={`${notFoundPhoto}`} alt="" />
                <span className='color-main fs-1 fw-semibold'>Menu not found!</span>
              </div>
            ) : (
              <>
                <div className="col-12 col-md-7">
                  <div className="row ">
                    {data?.map((food, i) => <div className="col-6 col-xl-4 mb-4" key={i}><FoodCard data={food}/></div>)}
                  </div>
                </div>
                <div className="col-12 col-md-5"> 
                  <OrderCard/>
                </div>
              </>
            )}
        </div>
      )}
    </MainTemplate>
  )
}

export default Transaction