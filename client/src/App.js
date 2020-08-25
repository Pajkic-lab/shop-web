import React, { useEffect } from 'react';
import { BrowserRouter,  Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, getUser } from './features/userSlice';

import Product from './componnents/Product';
import Navbar from './componnents/Navbar';
import Banner from './componnents/Banner';
import Smartphone from './componnents/Smartphone';
import Login from './componnents/Login';
import Chart from './componnents/Chart'



function App() {

  const dispatch = useDispatch()

  const { token } = useSelector(selectUser)

  useEffect(()=>{
    if(token !== null){
      dispatch(getUser())
    }
    //eslint-disable-next-line
  },[token])


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Banner} />
          <Route exact path='/smartphone' component={Smartphone} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/product/:product_public_id' component={Product} /> 
          <Route exact path='/chart' component={Chart} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
