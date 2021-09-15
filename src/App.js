import React, {Component} from 'react';
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
      loading: false, 
      favourites: saveData ? saveData : [],
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

  childCallback(e, value) {
    // value passed from child
    if (!this.state.favourites.includes(value)) {
    e.preventDefault();
    console.log(value);
    console.log(this.state)
    this.setState({favourites: [...this.state.favourites, value]});
    }
  }

  remove(i) {
    this.state.favourites.splice(i,1);
    this.setState({favourites: [...this.state.favourites]})
    console.log(this.state.favourites)

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
          <CoinIndex />
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