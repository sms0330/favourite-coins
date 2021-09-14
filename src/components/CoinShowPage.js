import React, { Component } from 'react';
import { Coin } from '../requests';
import Spinner from './Spinner';

class CoinShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = { coin: null};
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

  addFavourite = (e) => {
    e.preventDefault();
    // if (this.props.match.params.id) {
    //   console.log('hi')
    //   this.setState([this.state.coin.symbol])
    // }
    let clickedCoin = this.props.match.params.id;
    // this.props.favourites.push(clickedCoin);
    this.props.clickedCoins.push(clickedCoin);
    console.log(this.props.clickedCoins);

    // if (!this.props.match.params.id) {
    //   console.log('bye')
    //   this.setState([...this.state.favourites, this.state.coin.symbol])
    // }
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
                  <label><img src={image.thumb} className='logo' alt='logo'/>{name.toUpperCase()}{`(${symbol.toUpperCase()})`}</label>
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
                  <small onClick={(e) => this.addFavourite(e)}> ⨁ ADD TO FAVOURITE</small>
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
                  <div className="ui dropdown item">
                    Select Trade Currency <i className="dropdown icon"></i>
                    <div className="menu">
                        <i className="item">BITCOIN</i>
                        <i className="item">ETEHEREUM</i>
                        <i className="item">XRP</i>
                    </div>
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
