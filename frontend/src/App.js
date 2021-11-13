import './App.css';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom" 
import Success from './pages/Success';
import { useSelector } from 'react-redux';
function App() {
  const user = useSelector(state=>state.user.currentUser)
  return (
    <Router>
      <div className="App">
        <Switch>
            <Route exact path="/">
              {user ? <Home/>: <Redirect to="/register"/>}
            </Route>
            <Route path="/Register">
              {user ? <Redirect to="/"/> : <Register/>}
            </Route>
            <Route path="/login">
              {user ? <Redirect to="/"/> : <Login/>}
            </Route>
            {user && (
              <>
                <Route path="/product/:id">
                  <Product/>
                </Route>
                <Route path="/products/:category">
                  <ProductList/>
                </Route>
                <Route path="/cart">
                  <Cart/>
                </Route>
                <Route path="/success">
                  <Success/>
                </Route>
              </>
            )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
