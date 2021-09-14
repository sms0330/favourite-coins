import React, { Component } from 'react';
import { Coin } from '../requests';
import Spinner from './Spinner';

class BuySell extends Component {
  constructor(props) {
    super(props);
    this.state = {coins: [], info: null, currency: null};
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

    HandleChange = (e) => {
        e.preventDefault()
        
        const chosen = e.target.value
        this.setState({info: this.state.coins.filter((coi) => {
            return coi.name === chosen
        })});

        this.setState({currency: chosen});
    };


    render() {
    if (!this.state.coins) {
      return <Spinner />;
    }
    return (
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
    );
  }
}

export default BuySell;