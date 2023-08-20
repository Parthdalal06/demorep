import { Component, Fragment } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Menu, Inbox, Drafts, ThreeSixty } from "@mui/icons-material";
import ChildComponent from "./ChildComponent";
import NotFound from "./NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProfileContainer from "./pages/Profile/ProfileContainer";
import TicketContainer from "./pages/Tickets/TicketContainer";
import LoginSignupDialog from "./components/LoginSignupDialog";
import { signIn, signUp } from "./APIUrlConstants";
import NoLogin from "./NoLogin";
// import CardList from './CardList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("userDetails")),
      isLoginOpen: false,
    };
  }
  render() {
    const loginSignup = (isLogin, userDetails) => {
      console.log(isLogin, userDetails);
      if (isLogin) {
        fetch(signIn, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userDetails.userId,
            password: userDetails.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if(!data?.accessToken){
              alert(data?.message);
            }
            else{
            this.setState({ ...this.state, isLoginOpen: false, user: data });
            localStorage.setItem("userDetails", JSON.stringify(data));}
          });
      }
      else{
        fetch(signUp, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userDetails.name,
            userId: userDetails.userId,
            email: userDetails.email,
            password: userDetails.password,
            userType: userDetails.userType,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            this.setState({ ...this.state, isLoginOpen: false });
            alert("Registration successfull and please login to continue")
          }); 
      }
    };
    return (
      <div className='App'>
        <BrowserRouter>
          <Box sx={{ flexGrow: 1 }}>
            <LoginSignupDialog
              open={this.state.isLoginOpen}
              loginSignup={loginSignup}
            />
            <AppBar position='static'>
              <Toolbar>
                <IconButton
                  size='large'
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  sx={{ mr: 2 }}
                >
                  <Menu />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                  CRM
                </Typography>
                <Button
                  color='inherit'
                  onClick={() => {
                    if (this.state.user) {
                      localStorage.removeItem("userDetails");
                      this.setState({ ...this.state, user: null });
                    } else {
                      this.setState({ ...this.state, isLoginOpen: true });
                    }
                  }}
                >
                  {this.state.user != null ? "Logout" : "Login"}
                </Button>
              </Toolbar>
            </AppBar>
            <Grid container>
              <Grid item xs={3} style={{ backgroundColor: "lightgrey" }}>
                <nav aria-label='main navigation'>
                  <List>
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <Inbox />
                        </ListItemIcon>
                        <Link to={"/"}>
                          {" "}
                          <ListItemText primary='Dashboard' />
                        </Link>
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <Inbox />
                        </ListItemIcon>
                        <Link to={"/profile"}>
                          {" "}
                          <ListItemText primary='Profile' />
                        </Link>
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>
                        <ListItemIcon>
                          <Drafts />
                        </ListItemIcon>
                        <Link to={"/tickets"}>
                          {" "}
                          <ListItemText primary='Tickets' />
                        </Link>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </nav>
              </Grid>
              <Grid item xs={9} style={{ backgroundColor: "#e2e2e2" }}>
                <Routes>
                  <Route
                    path='/'
                    element={<Dashboard user={this.state.user} />}
                  />
                  <Route
                    path='profile'
                    element={<ProfileContainer userDetails={this.state.user} />}
                  />
                  <Route
                    path='tickets'
                    element={<TicketContainer userDetails={this.state.user} />}
                  />
                  <Route
                    path='/nologin'
                    element={<NoLogin user={this.state.user} />}
                  />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </Grid>
            </Grid>
          </Box>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
