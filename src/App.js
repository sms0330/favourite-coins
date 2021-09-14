import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CoinIndexPage from './components/CoinIndexPage';
import FavouritePage from './components/FavouritePage';
import Spinner from "./components/Spinner";
import CoinShowPage from './components/CoinShowPage';

const saveData = JSON.parse(localStorage.getItem("favourites"));
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, 
      favourites: saveData ? saveData : [],
      images: []
    }
  }

  componentDidMount() {
    const savedFavourites = JSON.parse(localStorage.getItem("favourites"));
    if (savedFavourites !== null) {
      this.setState(savedFavourites)
    }
    console.log('Component did mount')
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.favourites !== this.state.favourites) {
      localStorage.setItem('favourites', JSON.stringify(this.state.favourites))
        // this.setState( )
        console.log('changed')
    }
  }

  childCallback(e, value, image) {
    // value passed from child
    if (!this.state.favourites.includes(value)) {
    e.preventDefault();
    console.log(value);
    console.log(this.state)
    this.setState({favourites: [...this.state.favourites, value]});
    this.setState({images: [...this.state.images, image]});
    }
  }

  remove(i) {
    this.state.favourites.splice(i,1);
    this.setState({favourites: [...this.state.favourites]})
    this.state.images.splice(i,1);
    this.setState({images: [...this.state.images]})
    console.log(this.state.favourites)

  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <div className="App">
        <Router>
          <FavouritePage favourites={this.state.favourites} images={this.state.images} remove={this.remove.bind(this)}/>
          <CoinIndexPage />
            <Switch>
              <Route
                exact
                path="/coins/:id"
                render={(props) => <CoinShowPage {...props} passToParent={this.childCallback.bind(this)} />}

              />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;