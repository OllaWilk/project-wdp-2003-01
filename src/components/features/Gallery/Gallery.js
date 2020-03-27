import React from 'react';
import styles from './Gallery.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import 'rc-tooltip/assets/bootstrap_white.css';
import Tooltip from 'rc-tooltip';

import {
  faStar,
  faExchangeAlt,
  faShoppingBasket,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar, faHeart } from '@fortawesome/free-regular-svg-icons';

import FadeIn from 'react-fade-in';
import Button from '../../common/Button/Button';

class Gallery extends React.Component {
  state = {
    activeTab: 'featured',
    filteredArr: this.props.products.filter(el => el.newFurniture === true),
    activePage: 0,
    currentProduct: {
      id: 'aenean-ru-bristique-1',
      name: 'Aenean Ru Bristique 1',
      price: 30,
      oldprice: 35,
      stars: 5,
      promo: '',
      newFurniture: true,
      favorite: true,
      photo: 'https://cdn.pixabay.com/photo/2016/11/19/13/06/bed-1839183_1280.jpg',
    },
  };

  setNewCurrentProduct(el) {
    this.setState({
      currentProduct: {
        id: el.id,
        name: el.name,
        price: el.price,
        oldprice: el.oldprice,
        stars: el.stars,
        promo: el.promo,
        newFurniture: el.newFurniture,
        favorite: el.favorite,
        photo: el.photo,
      },
    });
  }

  moveRight() {
    const pagesCount = Math.ceil(this.state.filteredArr.length / 6);
    if (this.state.activePage < pagesCount - 1) {
      this.setState(prevState => ({
        activePage: prevState.activePage + 1,
      }));
    }
  }

  moveLeft() {
    const pagesCount = Math.ceil(this.state.filteredArr.length / 6);
    if (this.state.activePage > 0 && this.state.activePage < pagesCount) {
      this.setState(prevState => ({
        activePage: prevState.activePage - 1,
      }));
    }
  }

  filterProducts(arr, activeTab) {
    return new Promise((resolve, reject) => {
      switch (activeTab) {
        case 'featured':
          this.setState(
            { filteredArr: arr.filter(el => el.newFurniture === true) },
            resolve()
          );
          break;
        case 'topSeller':
          this.setState(
            { filteredArr: arr.filter(el => el.favorite === true) },
            resolve()
          );
          break;
        case 'saleOff':
          this.setState(
            { filteredArr: arr.filter(el => el.promo === 'sale') },
            resolve()
          );
          break;
        case 'topRated':
          this.setState({ filteredArr: arr.filter(el => el.stars === 5) }, resolve());
          break;
        default:
          this.setState(
            { filteredArr: arr.filter(el => el.newFurniture === true) },
            resolve()
          );
      }
    });
  }

  async handleTabChange(arr, newTab) {
    this.setState({ activeTab: newTab });
    await this.filterProducts(arr, newTab);
    this.setNewCurrentProduct(this.state.filteredArr[0]);
  }

  render() {
    const { products } = this.props;
    const { activeTab, filteredArr, activePage, currentProduct } = this.state;
    const categories = [
      { id: 'featured', name: 'featured' },
      { id: 'topSeller', name: 'top seller' },
      { id: 'saleOff', name: 'sale off' },
      { id: 'topRated', name: 'top rated' },
    ];

    return (
      <div className={styles.root}>
        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <div className={styles.heading}>
                <h3>Furniture gallery</h3>
              </div>
              <div className={styles.menu}>

                <ul>
                  {categories.map(el => (
                    <li key={el.id}>
                      <span
                        className={el.id === activeTab && styles.active}
                        onClick={() => {
                          this.handleTabChange(products, el.id);
                        }}
                      >
                        {el.name}
                      </span>
                    </li>
                  ))}
                </ul>

              </div>
              <FadeIn transitionDuration={2000}>
                <div className={styles.productSlider }>
                  <div className={styles.product}>
                    <img src={currentProduct.photo} alt='product' />
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
                      <h5>{currentProduct.name}</h5>
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
                        <h3>${currentProduct.price}</h3>
                        <h5><s>${currentProduct.oldprice}</s></h5>
                      </div>
                    </div>
                  </div>
                  <div className={styles.slider}>
                    <Button
                      className={styles.preview}
                      onClick={e => {
                        e.preventDefault();
                        this.moveLeft();
                      }}
                    >
                      <p>{'<'}</p>
                    </Button>
                    <div className={styles.thumbnails}>
                      {filteredArr.slice(activePage*6, (activePage + 1) * 6 ).map( (product, index) => (
                        <img
                          key={product.id}
                          src={product.photo}
                          alt=''
                          className = {product.photo === currentProduct.photo ? styles.thumbnail + ' ' + styles.active : styles.thumbnail}
                          onClick={e => {
                            e.preventDefault();
                            this.setNewCurrentProduct(product);
                          }}
                        />
                      ))}
                    </div>
                    <Button
                      className={styles.next}
                      onClick={e => {
                        e.preventDefault();
                        this.moveRight();
                      }}
                    >
                      <p>{'>'}</p>
                    </Button>
                  </div>
                </div>
              </FadeIn>
            </div>
            <div className={'col-6 ' + styles.picture}>
              <img src={products[2].photo} alt='prod3' />
              <div className={styles.details}>
                <h3>
                  from <span>${products[2].price}</span>
                </h3>
                <h1>{products[2].name}</h1>
                <Button variant='green'>Shop now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      category: PropTypes.string,
      price: PropTypes.number,
      stars: PropTypes.number,
      promo: PropTypes.string,
      newFurniture: PropTypes.bool,
      favorite: PropTypes.bool,
      photo: PropTypes.string,
      oldprice: PropTypes.number,
    })
  ),
};

export default Gallery;