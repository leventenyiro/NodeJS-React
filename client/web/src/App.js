import Navbar from './Navbar';
import Home from './Home';
import Create from './Create';
import ProductDetails from './ProductDetails';
import NotFound from './NotFound';
import RealTime from './RealTime';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/">
              <RealTime />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/product/:id">
              <ProductDetails />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
