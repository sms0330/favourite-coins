import React, { Component } from 'react';
import { Coin } from '../requests';
import Spinner from './Spinner';

class CoinShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = { coin: null };
  }
  componentDidMount() {
    Coin.show(this.props.match.params.id).then(coin => {
      this.setState({
        coin: coin
      });
    });
  }

  render() {
    if (!this.state.coin) {
      return <Spinner />;
    }
    const { name, current_price, market_cap, low_24h, high_24h, circulating_supply, total_supply, market_cap_rank } = this.state.coin;
    return (
      <main>
        <div className="ui placeholder segment">
          <div className="ui two column very relaxed stackable grid">
            <div className="column">
              <div className="ui form">
                <div className="field">
                  <label>{name}</label>
                  <hr className="show line" />
                </div>
                <p>CURRENT PRICE: ${current_price}</p>
                <p>MARKET CAP: {market_cap}</p>
                <p>LOW 24H: {low_24h}</p>
                <p>HIGH 24H: {high_24h}</p>
                <p>CIRCULATING SUPPLY: {circulating_supply}</p>
                <p>TOTAL SUPPLY: {total_supply}</p>
                <p>MARKET CAP RANK: {market_cap_rank}</p>
                <div className="favourite">
                  <button>add to favourite</button>
                </div>
              </div>
            </div>
            <div className="middle aligned column">
              <form>
                <div className="buy">
                  <button className="ui orange basic button">BUY</button>
                  <button className="ui orange basic button">SELL</button>
                  <div className="ui dropdown item">
                    Select Trade Currency <i className="dropdown icon"></i>
                    <div className="menu">
                        <a className="item">BITCOIN</a>
                        <a className="item">ETEHEREUM</a>
                        <a className="item">XRP</a>
                    </div>
                  </div>
                  <div className="ui dropdown item">
                    Amount <i className="dropdown icon"></i>
                    <div className="menu">
                        <a className="item">1</a>
                        <a className="item">2</a>
                        <a className="item">3</a>
                    </div>
                  </div>
                  <button className="ui orange button">SUBMIT</button>
                </div>
              </form>
            </div>
          </div>
          <div className="ui vertical divider"></div>
        </div>
      </main>
    );
  }
}

export default CoinShowPage;
