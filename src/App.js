import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CoinIndexPage from './components/CoinIndexPage';
import FavouritePage from './components/FavouritePage';
import Spinner from "./components/Spinner";
import CoinShowPage from './components/CoinShowPage';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, 
      favourites: []
    }
  }

  liftStateUp = (data) =>{
    this.setState({ favourites: [ data, ...this.state.favourites ]  })
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <div className="App">
        <Router>
          <FavouritePage clickedCoins={this.state.favourites}/>
          <CoinIndexPage />
            <Switch>
              <Route
                exact
                path="/coins/:id"
                // component={CoinShowPage}
                render={(props) => <CoinShowPage {...props} clickedCoins={this.state.favourites} />}

              />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
