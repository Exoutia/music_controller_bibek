import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.State = {
      roomCode: null,
    };
  }

  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        })
      });
  }

  renderHomePage() {
    return (
      <Grid Container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join-room" component={Link}>
              Join Room
            </Button>
            <Button color="secondary" to="/create-room" component={Link}>
              Create Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => {
            return this.state.roomCode ? (<Redirect to={`/room/${this.state.roomCode}`} />) : (this.renderHomePage());
          }}>
          </Route>
          <Route path="/join-room" component={RoomJoinPage}></Route>
          <Route path="/create-room" component={CreateRoomPage}></Route>
          <Route path="/room/:roomCode" component={Room}></Route>
        </Switch>
      </Router>
    );
  }
}
