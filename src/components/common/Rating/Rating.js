import React from 'react';
import PropTypes from 'prop-types';
import styles from './Rating.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

class Rating extends React.Component {
  state = {
    tempRate: null,
  };

  static propTypes = {
    id: PropTypes.string,
    stars: PropTypes.number,
    userRate: PropTypes.number,
    updateUserRate: PropTypes.func,
  };

  rate(rating) {
    this.props.updateUserRate(this.props.id, rating);
  }

  starOver(rating) {
    this.setState({
      tempRate: rating,
    });
  }

  starOut() {
    this.setState({
      tempRate: null,
    });
  }

  render() {
    const { stars, userRate } = this.props;

    const starsArray = new Array(5).fill(0).map((el, i) => ++i);

    return starsArray.map(i => (
      <button key={i}>
        {
          <FontAwesomeIcon
            className={`${this.state.tempRate >= i ? styles.tempRate : ''} ${
              userRate && i <= (userRate || stars) ? styles.userRate : ''
            }`}
            onClick={this.rate.bind(this, i)}
            icon={i <= (userRate || stars) ? faStar : farStar}
            onMouseOver={this.starOver.bind(this, i)}
            onMouseOut={this.starOut.bind(this)}
          >
            {i} stars
          </FontAwesomeIcon>
        }
      </button>
    ));
  }
}

export default Rating;
