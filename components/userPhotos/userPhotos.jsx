import React from 'react';
import {
  Typography, CardMedia, CardContent, Card, ListItem, ListItemText,
} from '@material-ui/core';
import './userPhotos.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { myPhotos: null, newComment: "" };
    console.log("hello");
  }


  componentDidMount() {
    // console.log("photos has mounted");
    //get axios response 
    var url = "/photosOfUser/" + this.props.match.params.userId.toString();

    axios.get(url).then((response) => {
      // console.log("inside response photos", response);
      this.setState({ myPhotos: response.data });
      // console.log("response obj", response);
      // console.log("response.data", response.data);
    }).catch(err => { console.log(err) })
  }


  componentDidUpdate(prevProps) {
    // console.log("photos has updated");
    //console.log(this.props);
    if (this.props !== prevProps) {
      var url = "/photosOfUser/" + this.props.match.params.userId.toString();
      console.log(url);
      axios.get(url).then((response) => {
        // console.log("inside response photos", response);

        this.setState({ myPhotos: response.data });

      }).catch(err => { console.log(err) })
    }
  }




  render() {
    if (this.state.myPhotos === null) {
      return (<div>Loading....</div>);
    }
    else {
      return (

        <div>


          <h2>This is photos page!</h2>
          <div className="photoCard">
            {this.state.myPhotos.map((item) => (


              <div key={item._id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="500"
                    src={"/images/" + item.file_name}
                  />
                  <CardContent>
                    <Typography>
                      Posted on {item.date_time}
                    </Typography>
                    <Typography variant="h6">Comments</Typography>

                    {/* comments */}

                    {(item.comments) ? item.comments.map(thisComment => {

                      return (

                        <div key={thisComment._id}>

                          <ListItem>
                            <ListItemText
                              primary={thisComment.comment}
                              secondary={thisComment.date_time}>

                            </ListItemText>
                            {/* {thisComment.comment.comment}
                        {thisComment.comment.date_time} */}
                            <ListItem button component={Link} to={"/users/" + thisComment.user._id} />
                            <ListItemText>{thisComment.user.first_name}</ListItemText>
                          </ListItem>

                        </div>
                      );
                    }) : console.log("no comments")}

                    {/* add new comment */}
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="New Comment"
                      label="Add a comment"
                      type="New Comment"
                      id="New Comment"
                      autoComplete="New Comment"
                      onChange={(e) => { this.setState({ newComment: e.target.value }) }}



                    />
                    <Button
                      type="submit"
                      fullWidth variant="contained"
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();

                        let url = '/commentsOfPhoto/' + item._id;
                        console.log(url);
                        console.log(this.state);
                        let newComment = this.state.newComment;
                        console.log("type check", typeof newComment);


                        axios.post(url, { comment: newComment }).then(response => {
                          console.log("comment response ", response);

                        }).then((response) => {
                          //fetch model data again
                          //fetch model data again and call set state 
                          var old_url = "/photosOfUser/" + this.props.match.params.userId.toString();
                          console.log(old_url);
                          axios.get(old_url).then((data) => {
                            // console.log("inside response photos", response);
                            this.setState({ myPhotos: data.data });
                            console.log("state in 2nd axios", this.state);
                            // this.forceUpdate();

                          }).catch(err => { console.log(err) });
                        })

                          .catch(err => {
                            console.log("comment  err ", err);
                          })




                      }}

                    >
                      Submit
          </Button>

                    {/* comments */}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>


      );
    }
  }
}

export default UserPhotos;
