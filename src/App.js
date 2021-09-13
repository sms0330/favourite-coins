import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CoinIndexPage from './components/CoinIndexPage';
import FavouritePage from './components/FavouritePage';
import Spinner from "./components/Spinner";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }
  
  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <div className="App">
        <Router>
          <FavouritePage />
          <CoinIndexPage />
            <Switch>
              {/* <Route
                exact
                path="/coins/:id"
                component={CoinsShowPage}
              /> */}
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
