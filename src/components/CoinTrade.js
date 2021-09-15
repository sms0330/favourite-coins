import React, { Component } from 'react';
import Spinner from './Spinner';

class CoinTrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: null,
      targetPrice: null,
      targetAmount: null,
      buy: null,
      sell: null,
      receipt: null,
      value: null,
    };
  }

  GetDropdownCoinPrice = e => {
    e.preventDefault();
    const coin = this.props.coins.find(coin => coin.id === e.target.value);
    const price = coin.current_price;
    this.setState({ dropdownCoinPrice: price });
  };

  GetAmount = e => {
    e.preventDefault();
    const amount = e.target.value;
    this.setState({ targetAmount: amount });
  };

  Getprice(e) {
    e.preventDefault();
    const value = e.target.value;
    const coin = this.props.coins.find(coin => {
      return coin.name === value;
    });
    const price = coin.current_price;
    this.setState({ target: coin.symbol });
    this.setState({ targetPrice: price });
  }

  Buy = e => {
    e.preventDefault();
    this.setState({ buy: true, sell: false });
  };

  Sell = e => {
    e.preventDefault();
    this.setState({ buy: false, sell: true });
  };

  Submit = e => {
    const { target, targetAmount, targetPrice, buy, sell } = this.state;
    e.preventDefault();
    const refPrice = this.props.info.market_data.current_price.cad;
    const refSymbol = this.props.info.symbol;
    console.log('targetPrice is ' + targetPrice);
    console.log('targetAmount is ' + targetAmount);
    const coinNumToRef = refPrice / (targetPrice * targetAmount);
    const coinNumToTarget = (targetPrice * targetAmount) / refPrice;
    if (buy === true && sell === false && targetAmount && targetPrice){
      this.setState({
        receipt: `You have parchased ${
          targetAmount
        } ${target ? target.toUpperCase() : null} for ${coinNumToTarget} ${refSymbol.toUpperCase()}`
      });
    } else if (buy === false && sell === true && targetAmount && targetPrice){
      this.setState({
        receipt: `You have sold ${
          targetAmount
        } ${target ? target.toUpperCase() : null} for ${coinNumToRef} ${refSymbol.toUpperCase()}`
      });
    } else {
      
      this.setState({
        receipt: `please check the form`
    });}
  };

  render() {
    if (!this.props.coins) {
      return <Spinner />;
    }
    return (
      <form>
        <div className="two column row">
          <div className="trade">
            <br />
            <button className="buttons" onClick={this.Buy}>
              BUY
            </button>
            <button className="buttons" onClick={this.Sell}>
              SELL
            </button>
          </div>
          <div />
          <br />
          <div className="dropdown currency">
            <select
              onChange={e => {
                this.Getprice(e);
              }}
              className="ui fluid search dropdown"
              defaultValue='ImDefault'
            >
              <option value='ImDefault' disabled>
                Select Trade Currency{' '}
              </option>
              {this.props.coins.map(coin => {
                if (coin.name !== this.props.info.name) {
                  return (
                    <option key={coin.name} value={coin.name}>
                      {coin.name}
                    </option>
                  );
                } else { return false }
              })}
            </select>
          </div>
          <br />
          <div className="ui form">
            <input
              type="number"
              min="0"
              placeholder="Amount"
              value={this.state.amount}
              onChange={this.GetAmount}
            />
            <br />
          </div>
          <br />
          <div className="formButton">
            <button
              className="button"
              onClick={e => {
                this.Submit(e);
              }}
            >
              <h5>SUBMIT</h5>
            </button>
          </div>
        </div>
        <div className="receipt">{this.state.receipt}</div>
      </form>
    );
  }
}

export default CoinTrade;