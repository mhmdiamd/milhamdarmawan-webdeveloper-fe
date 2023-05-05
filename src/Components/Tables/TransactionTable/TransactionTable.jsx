import React from 'react'
import styles from './TransactionTable.module.css'
import { FormatRupiah } from '@arismun/format-rupiah'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { useGetAllTransactionQuery } from '../../../Features/transaction/transactionsApi'

const TransactionTable = () => {
  const {data} = useGetAllTransactionQuery()


  return (
    <table className="table table-borderless">
      <thead className={`${styles.bgGrey}`}>
        <tr>
          <th className='text-center' scope="col">#</th>
          <th scope="col">Uang Pembeli</th>
          <th scope="col">Harga Menu</th>
          <th scope="col">Kembalian</th>
          <th className='text-center' scope="col">Operation</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((transaction, i) => (
          <tr key={i} className='bg-light align-items-center mb-2'>
            <th className={`align-middle text-center`}>{i + 1}</th>
            <td className={`align-middle`}><FormatRupiah value={transaction.customer_money}/></td>
            <td className='align-middle'><FormatRupiah value={transaction.total_price}/></td>
            <td className={`align-middle`}><FormatRupiah value={transaction.rest_money}/></td>
            <td className={`align-middle text-center`}>
              <FontAwesomeIcon onClick={() => onDeleteMenuHandler(transaction.id)} className='color-main fs-5 pointer' icon={faCircleInfo} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TransactionTable