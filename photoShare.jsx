import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch, Redirect
} from 'react-router-dom';
import {
  Grid, Typography, Paper
} from '@material-ui/core';
import './styles/main.css';

// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/UserDetail';
import UserList from './components/userList/UserList';
import UserPhotos from './components/userPhotos/UserPhotos';
import LoginRegister from './components/loginRegister';
import axios from 'axios';
import SignUp from './components/SignUp';


class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };

  }



    
  









render() {
  return (
    <HashRouter>
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <TopBar loggedIn = {this.state.loggedIn}
                     state = {this}
             
            />
          </Grid>
          <div className="cs142-main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="cs142-main-grid-item">
              <UserList />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="cs142-main-grid-item">
              <Switch>
                {console.log("check this state value", this.state.loggedIn)}

                {/* is the path for the home page */}
                {/* <Route path="/loginRegister" component={LoginRegister} /> */}
                
                <Route path="/loginRegister" render={props => <LoginRegister isLoggedIn = {this} {...props}/>} />

                {/* ???  does it give the api call before the next set of commands */}

                {this.state.loggedIn === true ? <Route exact path="/" render={<h1>Is logged in </h1>} /> :
                  <Redirect exact path="/" to="/loginRegister"
                  />
                }

                {this.state.loggedIn === true ? <Route path="/users/:userId"
                  render={props => <UserDetail {...props} />}
                /> :
                  <Redirect path="/users/:userId" to="/loginRegister" />}

                {this.state.loggedIn === true ?
                  <Route path="/users/:userId" render={props => <UserDetail {...props} />} /> : <Redirect path="/users/:userId" to='/loginRegister' />}

                {this.state.loggedIn === true ? <Route path="/photos/:userId"
                  render={props => <UserPhotos {...props} />} /> : <Redirect path="/photos/:userId" to="/loginRegister" />}


                {this.state.loggedIn === true ? <Route path="/users" component={UserList} /> : <Redirect path="/users" to='/loginRegister' />}
                
                <Route path="/signUp"
                  component = {SignUp}/>

              </Switch>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </HashRouter>
  );
}
}


ReactDOM.render(
  <PhotoShare />,
  document.getElementById('photoshareapp'),
);
