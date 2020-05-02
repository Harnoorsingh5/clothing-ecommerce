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

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
)
const JacketsPage = () => (
  <div>
    <h1>JACKETS PAGE</h1>
  </div>
)
const SneakersPage = () => (
  <div>
    <h1>SNEAKERS PAGE</h1>
  </div>
)
const WomensPage = () => (
  <div>
    <h1>WOMENS PAGE</h1>
  </div>
)
const MensPage = () => (
  <div>
    <h1>MENS PAGE</h1>
  </div>
)

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
          <Route path='/shop/hats' component={HatsPage}/>
          <Route path='/shop/jackets' component={JacketsPage}/>
          <Route path='/shop/sneakers' component={SneakersPage}/>
          <Route path='/shop/womens' component={WomensPage}/>
          <Route path='/shop/mens' component={MensPage}/>
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


const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
