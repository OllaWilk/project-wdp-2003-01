import React from 'react';
import styles from './Gallery.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import 'rc-tooltip/assets/bootstrap_white.css';
import Tooltip from 'rc-tooltip';

import {
  faStar,
  faHeart,
  faExchangeAlt,
  faShoppingBasket,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

import Button from '../../common/Button/Button';
import initialState from '../../../redux/initialState';


const Gallery = ({products}) => {
  return (
    <div className={styles.root}>
      <div className='container'>
        <div  className='row'>
          <dic className='col-6 '>
            <div className={styles.heading}>
              <h3>Furniture gallery</h3>
            </div>
            <div className={styles.menu}>
              <ul>
                <li>
                  <span className={styles.active}>Featured</span>
                </li>
                <li>
                  <span>Top seller</span>
                </li>
                <li>
                  <span>Sale off</span>
                </li>
                <li>
                  <span>Top rated</span>
                </li>
              </ul>
            </div>
            <div className={styles.product}>
              <img src={initialState.products[0].photo} alt='product-1' />
              <div className={styles.buttons}>
                <Tooltip
                  placement='right'
                  overlay='Add to favorite'
                  arrowContent={<div className='rc-tooltip-arrow-inner' />}
                >
                  <Button variant='galleryBtn'>
                    <FontAwesomeIcon icon={faHeart}>{'Add to compare'}</FontAwesomeIcon>
                  </Button>
                </Tooltip>
                <Tooltip
                  placement='right'
                  overlay='Add to compare'
                  arrowContent={<div className='rc-tooltip-arrow-inner' />}
                >
                  <Button variant='galleryBtn'>
                    <FontAwesomeIcon icon={faExchangeAlt}>Add to compare</FontAwesomeIcon>
                  </Button>
                </Tooltip>
                <Tooltip
                  placement='right'
                  overlay='View details'
                  arrowContent={<div className='rc-tooltip-arrow-inner' />}
                >
                  <Button variant='galleryBtn'>
                    <FontAwesomeIcon icon={faEye}>View details</FontAwesomeIcon>
                  </Button>
                </Tooltip>
                <Tooltip
                  placement='right'
                  overlay='Add to basket'
                  arrowContent={<div className='rc-tooltip-arrow-inner' />}
                >
                  <Button variant='galleryBtn'>
                    <FontAwesomeIcon icon={faShoppingBasket}>Add to basket</FontAwesomeIcon>
                  </Button>
                </Tooltip>
              </div>
              <div className={styles.content}>
                <div className={styles.triangleTopLeft} />
                <h5>{initialState.products[0].name}</h5>
                <div className={styles.stars}>
                  <span>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                  </span>
                </div>
                <div className={styles.triangleBottomRight} />
                <div className={styles.price}>
                  <h3>$ {initialState.products[0].price}</h3>
                  <h3> <s>$ {initialState.products[0].oldPrice}</s></h3>
                </div>
              </div>
            </div>
            <div className={styles.slider}>
              <Button className={styles.preview}>
                <p>{'<'}</p>
              </Button>
              <div className={styles.thumbnails}>
                {initialState.products.slice(0, 6).map(product => (

                  <div key={product.id} className={styles.thumbnail + ' ' + styles.active}>
                    <img
                      src={product.photo}
                      alt=''
                    />
                  </div>
                ))}
              </div>
              <Button className={styles.next}>
                <p>{'>'}</p>
              </Button>
            </div>
          </dic>
          <div className={'col-6 ' + styles.picture}>
            <img src={initialState.products[2].photo} alt='product'/>
            <div className={styles.details}>
              <h3>from <span>$ {initialState.products[2].price}</span></h3>
              <h1>{initialState.products[2].name}</h1>
              <Button variant='greenBtn'>Shop now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


Gallery.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      category: PropTypes.string,
      price: PropTypes.number,
      oldPrice: PropTypes.number,
      stars: PropTypes.number,
      promo: PropTypes.string,
      newFurniture: PropTypes.bool,
      favorite: PropTypes.bool,
      photo: PropTypes.string,
    })
  ),
};


export default Gallery;