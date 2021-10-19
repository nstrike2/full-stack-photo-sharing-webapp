import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
}
  from '@material-ui/core';
import './userList.css';
import { Link } from "react-router-dom";
import axios from 'axios';


/**
 * Define UserList, a React componment of CS142 project #5
 */
/**component should provide navigation to the user details of all the users
 *  in the system. The component is embedded in the side bar and should provide a 
 * list of user names so that when a name is clicked, the content view area 
 * switches to display the details of that user. */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { myUsers: [] };
  
    this.componentDidMount=()=>{
   
      axios.get('/user/list').then((response)=>{
        //console.log("axios response works,", response.data);
        this.setState({myUsers: response.data});
      }).catch((err)=>{
          console.log("error: ", err);
      })
    }
  }


  render() {

    return (
      <div>
        <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window.
          You might choose to use <a href="https://material-ui.com/demos/lists/">Lists</a> and <a href="https://material-ui.com/demos/dividers">Dividers</a> to
          display your users like so:
        </Typography>
        <List component="nav">
         

          {this.state.myUsers.map((item) =>

            <div key={item._id}>
              <ListItem
                button component={Link} to={"/users/" + item._id}>
                <ListItemText primary={item.first_name + " " + item.last_name}></ListItemText>
              </ListItem>
              <Divider />
            </div>
          )}

          <Divider />
        </List>
        <Typography variant="body1">
          The model comes in from window.cs142models.userListModel()
        </Typography>
      </div>
    );
  }
}

export default UserList;
