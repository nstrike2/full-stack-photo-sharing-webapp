import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//reference: I used material UI template for styling and changed the code for this assignment spec
import axios from 'axios';
import UserDetail from './userDetail/userDetail';
import SignIn from './SignUp';
import { render } from 'react-dom';

import {
    HashRouter, Route, Switch, Redirect, Link
} from 'react-router-dom';




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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function loginRegister(props) {
    console.log("props check", props);

    const classes = useStyles();
    //use hooks 
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    
    const [password, setPassword] = useState("");

    //login now 
    const [loginName, setLoginName] = useState("");




    const handleFname = (e) => {
        setFirstname(e.target.value);
        console.log("firstname", firstname);
    }
    const handleLname = (e) => {
        setLastname(e.target.value);
        console.log("lastname", lastname);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
        console.log("email", email);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
        console.log("password", password);
    }
    const handleLoginName = (e) => {
        setLoginName(e.target.value);
        console.log("login_name");
    }




    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        {/* <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handleFname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleLname}
                            />
                        </Grid> */}
                        {/* <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange = {handleEmail}
                            />
                        </Grid> */}
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handlePassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="loginName"
                                label="loginName"
                                type="loginName"
                                id="loginName"
                                autoComplete="loginName"
                                onChange={handleLoginName}
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e) => {
                            e.preventDefault();
                            axios.post('/admin/login', { login_name: loginName, password: password }).then(response => {
                                console.log("loginReg response ", response);
                                console.log("priting props after button click ", props);
                                props.isLoggedIn.setState({ loggedIn: true });

                            }).catch(err => {
                                console.log("loginReg err ", err);
                            })

                                ;
                        }}

                    >
                        Sign In
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            {/* <Link href="#" 
                            variant="body2"
                            onClick={(e)=>{render = ()=>{<SignIn/>}}}
                            >
                                Already have an account? Sign in
              </Link> */}

              <Link to ="/signUp"> <Button
              color= "primary"
              type ="submit"
              
              >SignUp instead</Button></Link>
                       


                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>

            </Box>
        </Container>
    );
}