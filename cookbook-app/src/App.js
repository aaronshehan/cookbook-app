import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import {BrowserRouter, Route} from "react-router-dom";
import { IconContext } from 'react-icons';
import { MdHome } from 'react-icons/md';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import AllRoutes from './Routes/AllRoutes';
import GoogleBtn from './components/GoogleBtn';
import Login from './pages/Login/Login';
import './App.css';

class App extends React.Component {
  render() {
    return (
      //  Navbar
      <BrowserRouter>
        <Switch> {/* Here is where switch is used to not have the nav bar on the login page. The login bar is in div tags with the rest of the pages. */}
          <Route exact path="/login">
            <Login/>
          </Route>
          <React.Fragment>
            <Navbar bg="light" expand="lg">
              <IconContext.Provider value ={{size:70}}> 
                <Navbar.Brand href="/"><MdHome/></Navbar.Brand>
              </IconContext.Provider>
              <Navbar.Collapse id="navbar">
                <Nav className="mr-auto">
                  <Nav.Link href="discover">Discover</Nav.Link>
                  <Nav.Link href="saved">Saved</Nav.Link>
                  <Nav.Link href="create">Create</Nav.Link>
                </Nav>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-success">Search</Button>
                </Form>

                {/* Display name of user if logged in along with dropdown to go to profile. Otherwise show loginbutton */}
                {/* TODO:: This needs to probably be updated when Jon finishes login screen functionality */}
                { this.props.user ?
                  <NavDropdown title={this.props.user.name}>
                  <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider/>
                  <NavDropdown.Item><GoogleBtn /></NavDropdown.Item>
                  </NavDropdown>:
                  <GoogleBtn/>
                }
              </Navbar.Collapse>  
            </Navbar>
            <AllRoutes />
          </React.Fragment>
        </Switch>
      </BrowserRouter>
    )
  }
}

//  Allow use of google profile information from redux
const mapStateToProps = (state) => ({
  user: state.usrReducer.user
})

export default connect(mapStateToProps)(App);
