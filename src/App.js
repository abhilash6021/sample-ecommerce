import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'

import "./App.css";
import Header from "./components/header/header.component.jsx";
import Homepage from "./pages/homepage/homepage.component.jsx";
import ShopPage from "./pages/shop/shop.component.jsx";
import Checkout from './pages/checkout/checkout.component.jsx'
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from '../src/redux/user/user.selectors'
class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
   setCurrentUser({
              id: snapShot.id,
              ...snapShot.data(),
          });
        });
        //this.setState({currentUser:userAuth});
      }
     setCurrentUser(userAuth) ;
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/signin" render={() => this.props.currentUser? (<Redirect to='/'/>):(<SignInAndSignUpPage />) }/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
