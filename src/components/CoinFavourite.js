import React, { Component } from 'react';
import Bitcoin from './assets/img/Bitcoin.svg';
import BitcoinCash from './assets/img/BCH.svg';
import Ethereum from './assets/img/Ethereum.svg';
import Litecoin from './assets/img/Litecoin-new.svg';
import XRP from './assets/img/XRP.svg';
import Spinner from './Spinner';

const images = {
  BITCOIN: Bitcoin,
  'BITCOIN CASH': BitcoinCash,
  ETHEREUM: Ethereum,
  XRP: XRP,
  LITECOIN: Litecoin,
};
class CoinFavourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      favourites: [],
    };
  }

  deleteFavourite(id) {
    this.setState(state => {
      return {
        favourites: state.favourites.filter(f => f.id !== id),
      };
    });
  }

  render() {
    if (!this.state.favourites) {
      return <Spinner />;
    }
    return (
      <div className="head">
        <h1 className="head title">Favourite Coins</h1>
        {this.props.favourites.map((el, i) => {
          return (
            <button key={i} onClick={() => this.props.remove(i)} className="faveButtons">
              <span id="favorite">
                <span style={{ verticalAlign: 'middle' }}>
                  <img src={images[el]} alt="logo" />
                </span>
                <span style={{ verticalAlign: 'middle' }}> {el}</span>
              </span>
            </button>
          );
        })}
      </div>
    );
  }
}

export default CoinFavourite;
