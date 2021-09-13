import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Coin } from "../requests";
import Spinner from './Spinner'
// import { Icon, Label, Menu, Table } from 'semantic-ui-react'


class CoinIndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coins: []
        };
    }
    componentDidMount() {
        Coin.index().then(coins => {
            this.setState({
                coins: coins
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
                                            <td data-label="NAME"><Link to={`/coins/${coin.id}`}>{coin.name}</Link></td>
                                            <td data-label="TOTAL SUPPLY">{coin.circulating_supply}</td>
                                            <td data-label="MARKET CAP">{coin.market_cap}</td>
                                            <td data-label="CURRENT PRICE">${coin.current_price}</td>
                                            </tr>
                                            ))}
                                    
                                    </tbody>
                              
                    
                      </table>
            </main>
        );
    }
}

export default CoinIndexPage;