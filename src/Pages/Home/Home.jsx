import React from 'react';
import MainTemplate from '../../Templates/MainTemplate/MainTemplate';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetAllMenuQuery } from '../../Features/food/foodApi';
import FoodTable from '../../Components/Tables/FoodTable/FoodTable';

const Home = () => {
  const { data: foods } = useGetAllMenuQuery()

  return (
    <MainTemplate>
      <span className='text-muted d-block mb-4'>Tambahkan menu yang ada di resto</span>

      <Container className='shadow p-4 bg-white rounded overflow-x-scroll'>
        <Link to={'/menu/create-menu'} className='btn bg-main text-light mb-4'>+ Tambah Menu</Link>
        <FoodTable data={foods} />
      </Container>

    </MainTemplate>
  )
};

export default Home;
