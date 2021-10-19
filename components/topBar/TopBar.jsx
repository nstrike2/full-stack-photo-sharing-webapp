import React from 'react';
import {
  AppBar, Toolbar, Typography
} from '@material-ui/core';
import './TopBar.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.loggedIn);
    console.log("state", props.state);
    this.state = { userName: "" };

    if(props.loggedIn === true){
      console.log("props true");
    }
    else{
      console.log("props false");
    }


  }
  componentDidUpdate(prev){
    if(this.props !==prev){
      console.log("this", this.props);
      console.log("prev", prev);
      //axios call here 
      this.getName();
    }

  }

  getName = () => {

    axios.get('/session').then(response => {
      console.log('topbar response ', response);
      this.setState( { userName: "Hello " + response.data.first_name });
      return;
    }).catch(err => {
      console.log("topbar axios ", err);
      return;
    })
  }



  render() {
    return (

      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar className="toolBar">
          <Typography variant="h5" color="inherit">
            Photo Share App
          </Typography>

          {this.props.loggedIn === true ?
            <div>
              <Typography variant ='h5' color='inherit'>
                {this.state.userName}
              </Typography>

              <input type="file" accept="image/*" ref={(domFileRef) => { this.uploadInput = domFileRef; }} />
              <Button
                type="submit"
                variant="contained"
                color="secondary"

                onClick={(e) => {
                  console.log("top bar btn pressed");
                  //handleUpload Button Click from hints section
                  e.preventDefault();
                  if (this.uploadInput.files.length > 0) {

                    // Create a DOM form and add the file to it under the name uploadedphoto
                    const domForm = new FormData();
                    domForm.append('uploadedphoto', this.uploadInput.files[0]);
                    console.log("photo up test", this.uploadInput.files[0]);
                    axios.post('/photos/new', domForm)
                      .then((res) => {
                        console.log(res);
                      })
                      .catch(err => console.log(`POST ERR: ${err}`));
                  }
                }}

              >Add Photo</Button>
              <Button type ="submit" variant="contained" color="secondary" 
              onClick={e =>{
                axios.post('/admin/logout',{}).then(response=>{
                  console.log("logged out");
                  this.props.state.setState({loggedIn: false});
                }).catch(err=>{console.log(err)});

              }}
              
              >Logout</Button>


            </div>

            
            : console.log("not logged in")
          }

        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
