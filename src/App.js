import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shoppage/shoppage.component.jsx';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';
import CheckoutPage from './components/checkout/checkout.component';


// moment that route inside switch matches it does not renders anything else
// it gives control over code; more security in terms it will only opn that particular link 
class App extends React.Component{
  /*
      no need of this constructor as we hvae introduced redux
  */
  // constructor(){ 
  //   super();

  //   this.state = {
  //     currentUser: null,
  //   }
  // }

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (this.userAuth) {
        // console.log(userAuth);
        // console.log(this.userAuth);
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }else{
        setCurrentUser(userAuth);
       }
    });
    // console.log(this.unsubscribeFromAuth);
  }

  componentWillUnmount() {
    
    this.unsubscribeFromAuth=null;
  }


  render(){
    return (
      <div>
        <Header/>
        <Switch> 
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
