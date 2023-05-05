import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Container } from 'react-bootstrap'
import styles from './MainTemplate.module.css'

const MainTemplate = ({ children }) => {  
  return (
    <>
      <main className={`${styles.bgLight} ${styles.height} position-relative`}>
        <Navbar />
        <Container className='mt-5'>
          { children }
        </Container>

      </main>
      <footer className={`${styles.textFooter} ${styles.bgLight} w-100 mx-auto text-center py-3`}>Alan Resto © 2020 | Developed By Alan Creative</footer>
    </>
  )
}

export default MainTemplate