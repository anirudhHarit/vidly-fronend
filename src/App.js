import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import auth from '../src/services/authService';
import Movies from './Components/movies';
import NavBar from './Components/routing/navBar';
import Customer from './Components/routing/navBarComp/customers';
import Rental from './Components/routing/navBarComp/rental';
import NotFound from './Components/routing/notFound';
import MovieForm from './Components/common/movieForm';
import LoginForm from './Components/routing/navBarComp/loginForm';
import Logout from './Components/routing/navBarComp/logout';
import UserProfile from './Components/routing/navBarComp/profile';
import ProtectedRoute from './Components/common/protectedRoute';
import Register from './Components/routing/navBarComp/register';
import './App.css';

class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}
	render() {
		const { user } = this.state;
		return (
			<>
				<NavBar user={user} />
				<div className="container">
					<Switch>
						<Route path="/register" component={Register} />
						<Route path="/login" component={LoginForm} />
						<Route path="/logout" component={Logout} />
						<ProtectedRoute path="/movies/:id" component={MovieForm} />
						<Route
							path="/movies"
							render={props => <Movies {...props} user={user} />}
						/>
						<Redirect exact from="/" to="/movies" />
						<Route path="/customers" component={Customer} />
						<Route path="/profile" component={UserProfile} />
						<Route path="/rentals" component={Rental} />
						<Route path="/not-found" component={NotFound} />
						<Redirect to="/not-found" />
					</Switch>
				</div>
			</>
		);
	}
}

export default App;
