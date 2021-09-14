import React, { Component } from 'react';
import Bitcoin from './assets/img/Bitcoin.svg';
import BitcoinCash from './assets/img/BCH.svg';
import Ethereum from './assets/img/Ethereum.svg';
import Litecoin from './assets/img/Litecoin-new.svg';
import XRP from './assets/img/XRP.svg';
import Spinner from './Spinner';

const images = { 'BITCOIN': Bitcoin, 'BITCOIN CASH': BitcoinCash, 'ETHEREUM': Ethereum, 'XRP': XRP, 'LITECOIN': Litecoin }
class FavouritePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false, favourites: []
        };
    }

    // setFavourite(name) {
    //     this.setState({ favourites: name });
    //     this.props.liftStateUp(name);
    //     console.log(this.state.favourites);
    // }

    deleteFavourite(id) {
        this.setState((state) => {
            return {
                favourites: state.favourites.filter(f => f.id !== id)
            }
        })
    }

    // componentDidMount() {
    //     // this.setState((state) => {
    //     // })
    //     console.log('hi')
    // }
    
    //   componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.clickedCoins !== this.props.clickedCoins) {
    //         // this.setState( )
    //         console.log('changed')
    //     }
    //   }

    render() {
        if (!this.state.favourites) {
            return <Spinner />;
          }


        return (
            <div className='head'>
                <h1 className="head title">
                    Favourite Coins
                </h1>
                {/* <button onClick={() => console.log(this.props.favourites)}>Button</button> */}
                {/* //this.props.favourites!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                
                {this.props.favourites.map((el, i)=>{
                    return (
                        
                        <button 
                        key={i}
                        // data-hover='remove' 
                        onClick={() => this.props.remove(i)}
                        className="faveButtons"
                        >
                            {/* { <span class="iconify" data-icon={`logos:${icons.el}`}></span>} */}
                            <span id="favorite">
                                <span style={{verticalAlign:"middle"}}><img src={images[el]} alt="logo"/></span>
                                <span style={{verticalAlign:"middle"}}> {el}</span>
                            </span>
                        </button>
                      
                    )
                })} 
            </div>
        );
    }
}

export default FavouritePage;