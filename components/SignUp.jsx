import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {
  HashRouter, Route, Switch, Redirect, Link,
} from 'react-router-dom';
import axios from 'axios';
import { LocationOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  //use hooks 
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [password, setPassword] = useState("");

  //login now 
  const [loginName, setLoginName] = useState("");

  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState(false);


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login_name"
            label="Login Name"
            name="login name"
            autoComplete="login name"
            autoFocus
            onChange={(e) => { setLoginName(e.target.value); }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => { setPassword(e.target.value); }}

          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="first_name"
            label="First name"
            type="first_name"
            id="first_name"
            autoComplete="first_name"
            onChange={(e) => { setFirstname(e.target.value); }}

          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="last_name"
            label="Last name"
            type="last_name"
            id="last_name"
            autoComplete="last_name"
            onChange={(e) => { setLastname(e.target.value); }}

          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="location"
            label="location "
            type="location"
            id="location"
            autoComplete="location"
            onChange={(e) => { setLocation(e.target.value); }}

          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="description"
            type="description"
            id="description"
            autoComplete="description"
            onChange={(e) => { setDescription(e.target.value); }}

          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="occupation"
            label="occupation"
            type="occupation"
            id="occupation"
            onChange={(e) => { setOccupation(e.target.value); }}

          />


          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => {
              //api call
              e.preventDefault();
              var newUser = {
                login_name: loginName, password: password, first_name: firstname, last_name: lastname,
                occupation: occupation, location: location, description: description
              };
              axios.post('/user', newUser).then(response => {

                console.log("sign up response", response.data._id);
                setId(response.data._id);
                setStatus(true);

                
                //reroute to user detail
                // let n = response.data._id.length();
                // let clean = response.data._id.substr(1, n-2 ); 
                // console.log('clean ', clean);
                
                let url = '/user/' + response.data._id;
                
                console.log("url sign up check ", url);

                return <Redirect path='/signUp' to= {url} />;

              }).catch(err => {
                console.log("sign up error", err);
              }

              );

            }}
          >

            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>


            </Grid>
            <Grid item>


            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}