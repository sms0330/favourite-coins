import React, { Component } from 'react';
import { Coin } from '../requests';
import CoinTrade from './CoinTrade';
import Spinner from './Spinner';

class CoinShow extends Component {
  constructor(props) {
    super(props);
    this.state = { coin: null, showingCoin: null };
  }
  
  componentDidMount() {
    Coin.show(this.props.match.params.id).then(coin => {
      this.setState({
        coin: coin
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
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
        <div className="ui segment">
          <div className="ui two column grid">
            <div className="column" id="show-column">
              <div className="ui form">
                <div className="field">
                  <label>
                    <img src={image.thumb} style={{verticalAlign:"middle"}} className='logo' alt='logo'/>
                    <span style={{verticalAlign:"middle"}}>{name.toUpperCase()}</span>
                    <span style={{verticalAlign:"middle"}}>{`(${symbol.toUpperCase()})`}</span>
                  </label>
                </div>
                <hr className="show-line" />
                <p><strong>CURRENT PRICE:</strong> ${market_data.current_price.cad}</p>
                <p><strong>MARKET CAP:</strong> {market_data.market_cap.cad}</p>
                <p><strong>LOW 24H:</strong> {market_data.low_24h.cad}</p>
                <p><strong>HIGH 24H:</strong> {market_data.high_24h.cad}</p>
                <p><strong>CIRCULATING SUPPLY:</strong> {market_data.circulating_supply}</p>
                <p><strong>TOTAL SUPPLY:</strong> {market_data.total_supply}</p>
                <p><strong>MARKET CAP RANK:</strong> {market_data.market_cap_rank}</p>
                <div className="favourite">
                  <small onClick={(e) => this.props.passToParent(e, name.toUpperCase())}> ⨁ ADD TO FAVOURITE</small>
                </div>
              </div>
            </div>
            <div className="column">
              <CoinTrade info={this.state.coin} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default CoinShow;