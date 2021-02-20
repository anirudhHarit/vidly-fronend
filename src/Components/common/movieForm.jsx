import React from 'react';
import Form from '../routing/navBarComp/form';
import Joi from 'joi-browser';
import { getGenres } from '../../services/genreServices';
import { getMovies, saveMovie } from './../../services/movieServices';
class MovieForm extends Form {
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
		_id: Joi.string(),
		title: Joi.string().required().label('Title'),
		genreId: Joi.string().required().label('Genre'),
		numberInStock: Joi.number().min(1).max(100).required().label('Stock'),
		dailyRentalRate: Joi.number().min(1).max(5).required().label('Rate'),
	};

	async populateMovies() {
		const { data: allMovies } = await getMovies();
		const movieId = this.props.match.params.id;
		if (movieId === 'new') return;
		const movie = allMovies.find(movie => movie._id === movieId);
		if (!movie) return this.props.history.replace('/not-found');

		this.setState({ data: this.mapToViewModel(movie) });
	}

	async populateGenres() {
		const { data: genres } = await getGenres();
		this.setState({ genres });
	}

	async componentDidMount() {
		
		await this.populateGenres();
		await this.populateMovies();
	}

	mapToViewModel(movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate,
		};
	}

	doSubmit = async () => {
		await saveMovie(this.state.data);
		this.props.history.push('/movies');
		console.log('Saved');
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

export default MovieForm;
