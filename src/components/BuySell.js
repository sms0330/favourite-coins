import React, { Component } from 'react';
import { Coin } from '../requests';
import Spinner from './Spinner';

class BuySell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      currency: null,
      price: null,
      amount: null,
      buy: null,
      sell: null,
      receipt: null,
      info: [],
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
  HandleChange = e => {
    e.preventDefault();
    const chosen = e.target.value;
    this.setState({
      info: this.state.coins.filter(coin => {
        return coin.name === chosen;
      }),
    });

    this.setState({ currency: chosen });
  };

  HandleAmount = e => {
    e.preventDefault();
    const chosen = e.target.value;
    this.setState({ amount: chosen });
  };

  Buy = e => {
    e.preventDefault();
    this.setState({ buy: true });
    this.setState({ sell: false });
  };

  Sell = e => {
    e.preventDefault();
    this.setState({ buy: false });
    this.setState({ sell: true });
  };

  Submit = e => {
    const { amount, price, buy, sell, coins, info } = this.state;
    e.preventDefault();

    if (buy === true && sell === false) {
      let difference = 0;

      difference = (info[0].current_price * amount) / price;
      console.log(difference);
      this.setState({receipt: `You have purchased ${amount} ${info[0].symbol.toUpperCase()} for ${difference} ${coins[1].symbol}`});
    } else if (buy === false && sell === true) {
      let difference = 0;

      difference = (info[0].current_price * amount) / price;
      this.setState({receipt: `You have sold ${amount} ${info[0].symbol.toUpperCase()} for ${difference} ${coins[1].symbol}`});
    }
  };

  render() {
    if (!this.state.coins) {
      return <Spinner />;
    }
    return (
      <form>
        <div className="two column row">
            <div className="trade">
                <br />
                <button className="button" onClick={this.Buy}>BUY</button>
                <button className="button" onClick={this.Sell}>SELL</button>
            </div>
        <div />
          <br />
          <div className="dropdown currency">
            <select
              value={this.state.currency}
              onChange={this.HandleChange}
              className="ui fluid search dropdown"
            >
              <option disabled selected>
                Select Trade Currency{' '}
              </option>
              {this.state.coins.map(coin => {
                return (
                  <option key={coin.name} value={coin.name}>
                    {coin.name}
                  </option>
                );
              })}
            </select>
          </div>
          <br />
          <div className="ui form">
            <input type="number" min="0" placeholder="Amount" value={this.state.amount} onChange={this.HandleAmount} />
            {/* <select className="ui fluid search dropdown" multiple="" value={this.state.amount} onChange={this.HandleAmount}>
                    <option disabled selected> Amount </option>
                    {   
                        this.state.numbers.map((number) => {
                        return (
                                <option key={number} 
                                    value={number}
                                    >
                                    {number}
                                </option>
                        );
                    })
                    }
                </select> */}
            <br />
          </div>
          <br />
          <div className="formButton">
            <button className="button" onClick={this.Submit}>
                <h5>SUBMIT</h5>
            </button>
          </div>
        </div>
        <div className='receipt'>{this.state.receipt}</div>
      </form>
    );
  }
}

export default BuySell;
