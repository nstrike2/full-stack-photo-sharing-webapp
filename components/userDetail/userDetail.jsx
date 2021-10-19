import React from 'react';
import {
  Typography, Button, Divider,
} from '@material-ui/core';
import './userDetail.css';
import axios from 'axios';




/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { myUsers: null };
  }

  componentDidMount() {
    //make axios call
    var url = "/user/" + this.props.match.params.userId.toString();
    axios.get(url).then((response) => {
      this.setState({myUsers: response.data});
    }
    ).catch(err => {
      console.log(err);

    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== prevState) {
      var url = "/user/" + this.props.match.params.userId.toString();
      axios.get(url).then((response) => {
        this.setState({myUsers: response.data});
      }
      ).catch(err => {
        console.log(err);

      })

    }
  }



  render() {
    if (this.state.myUsers === null) {
      return (<div>Loading....</div>);
    }
    else {
      return (

        <div className="userDetail">

          <Typography variant="h2">

            {this.state.myUsers.first_name + " " + this.state.myUsers.last_name}
            <Divider />
          </Typography>
          <Typography variant="h6">
            {this.state.myUsers.occupation}
          </Typography>
          <Typography variant="h6">
            {this.state.myUsers.location}

          </Typography>
          <Typography variant="subtitle1">

            Current status : &quot{this.state.myUsers.description}&quot
        </Typography>
          <div>
            <Divider />
            <Button variant="contained" color="primary"
              href={"#photos/" + this.state.myUsers._id}
            >
              Photos
        </Button>
          </div>

        </div>

      );
    }
  }
}

export default UserDetail;
