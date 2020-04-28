import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shoppage/shoppage.component.jsx';
import {Switch, Route} from 'react-router-dom';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

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
  
  constructor(){
    super();

    this.state = {
      currentUser: null,
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (this.userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    // this.unsubscribeFromAuth();
    this.unsubscribeFromAuth=null;
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch> 
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/shop/hats' component={HatsPage}/>
          <Route path='/shop/jackets' component={JacketsPage}/>
          <Route path='/shop/sneakers' component={SneakersPage}/>
          <Route path='/shop/womens' component={WomensPage}/>
          <Route path='/shop/mens' component={MensPage}/>
          <Route path='/signin' component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    )
  }
}

export default App;
