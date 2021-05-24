import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Orders from './components/Orders';
import { auth } from './firebase';
import { useStateValue } from './components/StateProvider';
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51IuI87SC14T1JnqdD0OsxDRqdM75Cl9TdMKcUNuLxAPTANHo1mqCIcesyjEiWjdODlXTvOUZDvskA1wXwdk4iC4j00DfgVPqse')

function App() {
  const [{}, dispatch]  = useStateValue();

  useEffect(() => {
    
    auth.onAuthStateChanged(authUser => {

      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else{
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
    
  }, [])

  return (
    <BrowserRouter>
      <div className='app'>
        
        <Switch>
          <Route path='/' exact>
            <Header />  
            <Home />
          </Route>
          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/payments'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path='/orders'>
            <Header />
            <Orders />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
