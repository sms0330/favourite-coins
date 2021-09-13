import React, { Component } from 'react';
import Bitcoin from './assets/img/Bitcoin.png';
import BitcoinCash from './assets/img/BitcoinCash.png';
import Ethereum from './assets/img/Ethereum.png';
import Litecoin from './assets/img/Litecoin.png';
import XRP from './assets/img/XRP.png';

const images = { 'btc': Bitcoin, 'bch': BitcoinCash, 'eth': Ethereum, 'xrp': XRP, 'ltc': Litecoin }

class FavouritePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favourites: []
        };
    }

    deleteFavourite(id) {
        this.setState((state) => {
            return {
                favourites: state.favourites.filter(f => f.id !== id)
            }
        })
    }

    render() {
        return (
            <div className='head'>
                <h1 className="head title">
                    Favourite Coins
                </h1>
                <div className='favourite_list'>
                    { this.state.favourites.length === 0? 
                        <small className="string">
                            No Favourite Coins Added
                        </small>
                    :

                    this.state.favourites.map((f) => {
                        return (
                            <button className='buttons' 
                                data-hover='remove' 
                                key={f} id={f} 
                                onClick={() => this.deleteFavourite(f)}
                                    >
                                <img src={images[f]} 
                                    alt='hi' 
                                    className='logo'
                                    /> <p> {f} </p>
                            </button>
                        )
                    })
                }
                </div>
            </div>
        );
    }
}

export default FavouritePage;