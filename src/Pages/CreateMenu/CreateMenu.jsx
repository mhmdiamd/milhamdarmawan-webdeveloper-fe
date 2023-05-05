import React, {useState, useEffect} from 'react'
import MainTemplate from '../../Templates/MainTemplate/MainTemplate'
import { Container } from 'react-bootstrap'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CreateMenu.module.css'
import { useCreateMenuMutation } from '../../Features/food/foodApi';
import { failedLoading, showLoading, successLoading } from '../../common/loadingHandler';
import Swal from 'sweetalert2';
const CreateMenu = () => {

  const [createMenu, {isLoading, isSuccess, Error, isError}] = useCreateMenuMutation()
  
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const [data, setData] = useState({
    food_name : "",
    price: "",
    photo : ""  
  })

  const selectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    setData((prev) => {
      return {
        ...prev,
        photo: e.target.files[0],
      };
    });
  };

  useEffect(() => {
    if (!selectedFile) {
      setSelectedFile(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const openFileHandler = (e) => {
    document.querySelector('#file-photo').click()
  }

  // Change Handler form input
  const changeHandler = (e) => {
    setData(prev => {
      return {
        ...prev,
        [e.target.name] : e.target.value 
      }
    })
  }

  // Create Menu Handler
  const onCreate = async () => {
    const formData = new FormData()

    for(const attr in data) {
      formData.append(attr, data[attr])
    }

    await createMenu({data: formData})
  }

  // create menu condition handling
  useEffect(() => {
   
    if(isSuccess) {
      successLoading('Menu success created!')
      setData({
        food_name: "",
        photo: "",
        price: ""
      })

      setPreview(undefined)
    }
    if(isLoading) showLoading('Menu is being created, please wait a moment :)')
    if(isError) {
      failedLoading('Menu failed to create :(')
      Swal.close()
    }
    
  }, [, isLoading, isSuccess, isError])
  

  return (
    <MainTemplate>
      <Container className='shadow p-4 pt-5 bg-white rounded mb-5'>
        <div className="row">

          <div className="col-12 mb-4">
            <span className='color-main mb-4'>Tambah Menu</span>
          </div>

          <div className="col-12 mb-4">
            <label className="form-label text-muted">Nama Menu</label>
            <InputGroup>
              <Form.Control
                value={data.food_name}
                onChange={changeHandler}
                name='food_name'
                className='shadow-none'
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
          </div>

          <div className="col-12 mb-4">
            <label className="form-label text-muted">Foto Menu</label>

            <div onClick={openFileHandler} className={`${styles.bgUpload} ${styles.imgHeight} pointer img-container rounded border-1 border d-flex align-items-center justify-content-center flex-column`}>
              {preview ? (
                <img className={`${styles.sizePrevImg}`} src={preview} alt="user-img" />
              ) : (
                <>
                  <FontAwesomeIcon className='fs-3 mb-1 text-muted' icon={faCloudArrowUp} />
                  <span className='text-muted'>drag or drop a file here or click</span>
                </>
              )}
            </div>

            <input type="file" onChange={selectFile} id='file-photo' className='d-none' />
          </div>

          <div className="col-12">
            <label className="form-label text-muted">Price Menu</label>
            <InputGroup className="mb-4">
              <InputGroup.Text className='text-light bg-main border-main' id="basic-addon1">Rp.</InputGroup.Text>
              <Form.Control
                value={data.price}
                onChange={changeHandler}
                name='price'
                type='number'
                className='shadow-none'
                aria-label="price"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </div>

          <div className="col-2 ms-auto d-flex justify-content-end">
            <button onClick={onCreate} className="btn bg-green text-light w-100">Simpan</button>
          </div>
        </div>
      </Container>
    </MainTemplate>
  )
}

export default CreateMenu