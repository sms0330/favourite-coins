import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Coin } from '../requests';
import Spinner from './Spinner';

class CoinIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
    };
  }
  componentDidMount() {
    Coin.index().then(coins => {
      const filteredCoins = coins.filter(c => {
        if (
          c.id === 'bitcoin' ||
          c.id === 'ethereum' ||
          c.id === 'ripple' ||
          c.id === 'bitcoin-cash' ||
          c.id === 'litecoin'
        ) {
          return true;
        }
        return false;
      });
      this.setState({
        coins: filteredCoins,
      });
    });
  }

  render() {
    if (!this.state.coins) {
      return <Spinner />;
    }
    return (
      <main>
        <h1>ALL COINS</h1>
        <table className="ui fixed table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>TOTAL SUPPLY</th>
              <th>MARKET CAP</th>
              <th>CURRENT PRICE</th>
            </tr>
          </thead>

          {/*  */}
          <tbody>
            {this.state.coins.map((coin, index) => (
              <tr key={index}>
                <td data-label="NAME">
                  <Link to={`/coins/${coin.id}`}>{coin.name.toUpperCase()}</Link>
                </td>
                <td data-label="TOTAL SUPPLY">{coin.total_supply || 'INSERT VALUE'}</td>
                <td data-label="MARKET CAP">{coin.market_cap || 'INSERT VALUE'}</td>
                <td data-label="CURRENT PRICE">${coin.current_price || 'INSERT VALUE'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br/>
      </main>
    );
  }
}

export default CoinIndex;