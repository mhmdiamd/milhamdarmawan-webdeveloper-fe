import React from 'react';
import { Link } from 'react-router-dom';

import style from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDeleteRecipeByIdMutation } from '../../Features/recipe/recipeApi';

const Card = ({ item, onclick }) => {
  const [deleteRecipeById, { error, isLoading }] = useDeleteRecipeByIdMutation();

  const deleteHandler = async () => {
    await deleteRecipeById(item.id);

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${style.card}`}>
      <Link to={`/recipes/${item.id}`}>
        <img src={`https://source.unsplash.com/300x30${item.id}/?food`} className={`card-img-top ${style.img}`} alt="..." />
      </Link>

      <Link>
        <FontAwesomeIcon className={`card-title mx-1 bg-success ${style.cardEdit}`} icon={faPenToSquare} />
      </Link>
      <button>
        <FontAwesomeIcon className={`card-title mx-1 bg-danger ${style.cardDelete}`} icon={faTrash} onClick={deleteHandler} />
      </button>
      <div className={`card-body ${style.cardBody}`}>
        <h5 className="card-title">{item?.title}</h5>
      </div>
    </div>
  );
};

export default Card;
