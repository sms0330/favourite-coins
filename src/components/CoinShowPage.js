import React, { Component } from 'react';
import { Coin } from '../requests';
import Spinner from './Spinner';

class CoinShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = { coin: null, showingCoin: null, coins: [], info: null, currency: null};
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

HandleChange = (e) => {
    e.preventDefault()
    
    const chosen = e.target.value
    this.setState({info: this.state.coins.filter((coi) => {
        return coi.name === chosen
    })});

    this.setState({currency: chosen});
};


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
              <form>
                <div className="two column row">
                  <br/>
                  <button className="ui orange basic button">BUY</button>
                  <button className="ui orange basic button">SELL</button>
                  <div/><br/>
                  <div className="dropdown">
                    <select value={this.state.currency} onChange={this.HandleChange}>
                      <option disabled selected>Select Trade Currency </option>
                      {   
                         this.state.coins.map((coin) => {
                            return (
                                    <option key={coin.name} 
                                        value={coin.name}
                                        >
                                        {coin.name}
                                    </option>
                            );
                        })
                        }
                    </select>
                  </div><br/>
                  <br/>
                  <div className="ui dropdown item">
                    Amount <i className="dropdown icon"></i>
                    <div className="menu">
                        <i className="item">1</i>
                        <i className="item">2</i>
                        <i className="item">3</i>
                    </div>
                  </div><br/><br/>
                  <button className="ui orange button">SUBMIT</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default CoinShowPage;