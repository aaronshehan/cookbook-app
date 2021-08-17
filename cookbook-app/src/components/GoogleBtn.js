import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import { setUser } from '../store/actions/user_actions';
import DatabaseDriver from '../database/DatabaseDriver';

const CLIENT_ID = '503429243436-tmfnhmholf6frccbc0f41a3vp0rpo7hq.apps.googleusercontent.com';
class GoogleBtn extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }
 
  login (response) {
    if(response.accessToken){
      this.setState({
        isLogined: true,
        accessToken: response.accessToken
      });
    }
    this.props.setUser(response.profileObj);  // Save user's profile in redux
    DatabaseDriver.login(response.profileObj);  // Add user to the database
    localStorage.setItem('loggedin', 'true');
  }
 
  logout (response) {
    this.setState({
      isLogined: false,
      accessToken: ''
    });
    this.props.setUser(null);
    localStorage.setItem('loggedin', 'false');
  }

  handleLoginFailure (response) {
    alert('Failed to log in')
  }

  handleLogoutFailure (response) {
    alert('Failed to log out')
  }

  render() {
    return (
    <div>
      { this.state.isLogined ?
        <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Logout'
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
        >
        </GoogleLogout>: <GoogleLogin
          clientId={ CLIENT_ID }
          buttonText='Login'
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
          isSignedIn={ true }
        />
      }
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.usrReducer.user
})

export default connect(mapStateToProps, { setUser }) (GoogleBtn);