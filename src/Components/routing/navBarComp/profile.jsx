import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

class UserProfile extends Component {

	state = {};

	extractingNames() {
		const jwt = localStorage.getItem('token');
		const user = jwtDecode(jwt);
		return user.name
		}

	render() { 
		return ( <> 
		<h1>This is {this.extractingNames()} Profile</h1>
		</>);
	}
}
 
export default UserProfile;