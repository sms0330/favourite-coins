import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CoinIndexPage from './components/CoinIndexPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
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

export default App;
