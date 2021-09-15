import React, {Component} from 'react';
import { Coin } from './requests';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CoinIndex from './components/CoinIndex';
import CoinFavourite from './components/CoinFavourite';
import Spinner from "./components/Spinner";
import CoinShow from './components/CoinShow';

const saveData = JSON.parse(localStorage.getItem("favourites"));
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      loading: false, 
      favourites: saveData ? saveData : [],
    }
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
    const savedFavourites = JSON.parse(localStorage.getItem("favourites"));
    if (savedFavourites !== null) {
      this.setState(savedFavourites)
    }
    console.log('Component did mount')
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.favourites !== this.state.favourites) {
      localStorage.setItem('favourites', JSON.stringify(this.state.favourites))
      console.log('Component changed')
    }
  }

  childCallback(e, value) {
    if (!this.state.favourites.includes(value)) {
    e.preventDefault();
    this.setState({favourites: [...this.state.favourites, value]});
    }
  }

  remove(i) {
    this.state.favourites.splice(i,1);
    this.setState({favourites: [...this.state.favourites]})
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <div className="App">
        <Router>
          <CoinFavourite favourites={this.state.favourites} remove={this.remove.bind(this)}/>
          <br/>
          <CoinIndex coins={this.state.coins}/>
            <Switch>
              <Route
                exact
                path="/coins/:id"
                render={(props) => <CoinShow {...props} passToParent={this.childCallback.bind(this)} />}
              />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;