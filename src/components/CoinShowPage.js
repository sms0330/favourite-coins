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

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      Coin.show(this.props.match.params.id).then(coin => {
        this.setState({
          coin: coin
        });
      });
    }
  }


  render() {
    if (!this.state.coin) {
      return <Spinner />;
    }
    const { name, symbol, image, market_data } = this.state.coin;
    return (
      <main>
        <div className="ui placeholder segment">
          <div className="ui two column very relaxed stackable grid">
            <div className="column">
              <div className="ui form">
                <div className="field">
                  <label><img src={image.thumb} className='logo' alt='image'/>{name.toUpperCase()}{`(${symbol.toUpperCase()})`}</label>
                </div>
                <hr className="show line" />
                <p>CURRENT PRICE: ${market_data.current_price.cad}</p>
                <p>MARKET CAP: {market_data.market_cap.cad}</p>
                <p>LOW 24H: {market_data.low_24h.cad}</p>
                <p>HIGH 24H: {market_data.high_24h.cad}</p>
                <p>CIRCULATING SUPPLY: {market_data.circulating_supply}</p>
                <p>TOTAL SUPPLY: {market_data.total_supply}</p>
                <p>MARKET CAP RANK: {market_data.market_cap_rank}</p>
                <div className="favourite">
                  <button>add to favourite</button>
                </div>
              </div>
            </div>
            <div className="column">
              <form>
                <div className="two column row">
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
