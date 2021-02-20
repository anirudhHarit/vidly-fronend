import React from 'react';
import Form from './../routing/navBarComp/form';
import Joi from 'joi-browser';
import http from '../../services/httpService';
import { saveMovie } from '../../services/movieServices';
import { apiUrl } from '../../config.json';
class NewMovieForm extends Form {
	state = {
		data: {
			title: '',
			genreId: '',
			numberInStock: '',
			dailyRentalRate: '',
		},
		errors: {},
		genres: [],
	};
	schema = {
		title: Joi.string().required().label('Title'),
		genreId: Joi.string().required().label('Genre'),
		numberInStock: Joi.number()
			.min(1)
			.integer()
			.required()
			.label('Stock'),
		dailyRentalRate: Joi.number().min(1).max(10).required().label('Rate'),
	};

	async componentDidMount() {
		const { data: genres } = await http.get(apiUrl + '/genres');
		this.setState({ genres });
	}
	doSubmit = () => {
		saveMovie(this.state.data);
		this.props.history.replace('/movies');
		console.log('Saved', this.state.data);
	};
	render() {
		const { genres: dropDownData } = this.state;
		return (
			<div>
				<h1>Movie Form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('title', 'Title')}
					{this.renderDropDownInput('genreId', 'Genre', dropDownData)}
					{this.renderInput('numberInStock', 'Stock')}
					{this.renderInput('dailyRentalRate', 'Rate')}
					{this.renderButton('Save')}
				</form>
			</div>
		);
	}
}

export default NewMovieForm;
