import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlipCard from '@kennethormandy/react-flipcard';
import '@kennethormandy/react-flipcard/dist/Flipcard.css'
import './Card.css';
import rock from '../images/rock.svg';
import paper from '../images/paper.svg';
import scissors from '../images/scissors.svg';
import cardBack from '../images/card-back.svg';

const CardImage = ({ cardNumber }) => {
  switch (cardNumber) {
    case 0: return <img src={rock} width="155" height="155" alt="rock" />;
    case 1: return <img src={paper} width="155" height="155" alt="paper" />;
    default: return <img src={scissors} width="155" height="155" alt="paper" />;
  }
};

CardImage.propTypes = {
  cardNumber: PropTypes.number.isRequired
};

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };
  }

  render() {
    const toggleCard = () => {
      this.setState({
        isFlipped: !this.state.isFlipped
      });
    };

    return (
      <div className="tile is-child has-text-centered">
        <FlipCard flipped={this.state.isFlipped} type="horizontal">
          <div>
            <button onClick={toggleCard}>
              <img src={cardBack} width="155" height="155" alt="paper" />
            </button>
          </div>
          <div>
            <button onClick={toggleCard}>
              <CardImage cardNumber={this.props.cardNumber} />
            </button>
          </div>
        </FlipCard>
      </div>
    );
  }
}

Card.propTypes = {
  cardNumber: PropTypes.number.isRequired
};

export default Card;
