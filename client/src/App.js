import React,{Fragment} from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar" ;
import Home from "./components/pages/Home" ;
import About from "./components/pages/About" ;
import PrivateRoute from "./utils/PrivateRoute" ;
import {BrowserRouter as Router , Route , Switch} from "react-router-dom" ;
import ContactState from "./context/contacts/contactState" ;
import Alerts from "./components/layout/Alerts"
import AuthState from "./context/auth/authState" ;
import Register from "./components/Auth/Register"
import Login from "./components/Auth/Login"
import AlertState from "./context/alert/alertState" ; 
import setAuthToken from "./utils/setTokenAuth" ;

if(localStorage.token){
  setAuthToken(localStorage.token) ;
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar /> 
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} /> 
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
