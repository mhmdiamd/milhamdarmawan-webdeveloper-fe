import React from 'react'
import MainTemplate from '../../Templates/MainTemplate/MainTemplate';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetAllTransactionQuery } from '../../Features/transaction/transactionsApi';
import TransactionTable from '../../Components/Tables/TransactionTable/TransactionTable';

const ListTransaction = () => {
  const { data: foods } = useGetAllTransactionQuery()

  return (
    <MainTemplate>
      <span className='text-muted d-block mb-4'>Histori Transaksi</span>

      <Container className='shadow p-4 bg-white rounded overflow-x-scroll'>
        <TransactionTable data={foods} />
      </Container>

    </MainTemplate>
  ) 
}

export default ListTransaction