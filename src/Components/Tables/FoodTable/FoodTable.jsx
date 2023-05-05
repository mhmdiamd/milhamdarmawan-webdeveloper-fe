import React from 'react'
import styles from './FoodTable.module.css'
import { FormatRupiah } from '@arismun/format-rupiah'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useDeleteMenuMutation } from '../../../Features/food/foodApi'

const FoodTable = ({ data }) => {
  const [deleteMenu, { isSuccess, isLoading, isError }] = useDeleteMenuMutation()

  const onDeleteMenuHandler = async (id_food) => {
    if(confirm('Are you sure want to delete this menu?')) await deleteMenu({id_food})
  }

  return (
    <table className="table table-borderless">
      <thead className={`${styles.bgGrey}`}>
        <tr>
          <th className='text-center' scope="col">#</th>
          <th scope="col">Nama</th>
          <th className='text-center' scope="col">Foto</th>
          <th scope="col">Harga</th>
          <th className='text-center' scope="col">Operation</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((food, i) => (
          <tr key={i} className='bg-light align-items-center mb-2'>
            <th className={`align-middle text-center`}>{i + 1}</th>
            <td className={`align-middle`}>{food.food_name}</td>
            <td className='d-flex justify-content-center align-middle'>
              <img
                className={`${styles.imgSize} rounded img-fluid`}
                src={food.photo}
                alt=""
              />
            </td>
            <td className={`align-middle`}><FormatRupiah value={food.price}/></td>
            <td className={`align-middle text-center`}>
              <FontAwesomeIcon onClick={() => onDeleteMenuHandler(food.id)} className='text-danger pointer' icon={faTrashCan} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default FoodTable