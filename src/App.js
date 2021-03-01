import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Transaction from "./Pages/Transaction";

class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Product} />
        <Route path="/login" component={Login} />
        <Route path="/Cart" component={Cart} />
        <Route path="/Transaction" component={Transaction} />
      </Switch>
    )
  }
}

export default App;
