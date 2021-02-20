import { Bounce, toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/genreServices';
import { getMovies } from '../services/movieServices';
import { apiUrl } from '../config.json';
import React, { Component } from 'react';
import Pagination from '../Components/common/pagination';
import ListGroup from '../Components/common/listGroup';
import http from '../services/httpService';
import MovieTable from './movieTable';
import SearchBar from './common/searchBar';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		selectedGenre: null,
		searchKeywords: '',
		sortColumn: { path: 'title', order: 'asc' },
	};

	getPagedData = () => {
		const {
			movies: allMovies,
			pageSize,
			currentPage,
			sortColumn,
			selectedGenre,
			searchKeywords,
		} = this.state;

		let filtered = allMovies;
		if (searchKeywords)
			filtered = allMovies.filter(movie =>
				movie.title.toLowerCase().includes(searchKeywords.toLowerCase()),
			);
		else if (selectedGenre && selectedGenre._id)
			filtered = allMovies.filter(
				movie => movie.genre._id === selectedGenre._id,
			);

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const movies = paginate(sorted, currentPage, pageSize);
		return { totalCount: filtered.length, data: movies };
	};

	async componentDidMount() {
		const { data: realGenres } = await getGenres();
		const { data: realMovies } = await getMovies();
		const genres = [{ name: 'All Genres', _id: '' }, ...realGenres];
		this.setState({ movies: realMovies, genres });
	}

	handleDelete = async movieID => {
		const originalMovies = this.state.movies;
		const movies = this.state.movies.filter(m => m._id !== movieID);
		this.setState({ movies });
		try {
			const movie = this.state.movies.find(movie => movie._id === movieID);
			await http.delete(apiUrl + '/movies/' + movieID);
			toast.success(`${movie.title}  Deleted`);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				toast.error('This post is already been deleted');
				console.log('Logging an error', error);
			}
			this.setState({ movies: originalMovies });
		}
	};

	handleLike = movie => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handleDownload = movie => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].download = !movies[index].download;
		this.setState({ movies });
	};

	onGenreSelect = genre => {
		this.setState({
			selectedGenre: genre,
			currentPage: 1,
			searchKeywords: '',
		});
	};

	handlePageChange = page => {
		this.setState({ currentPage: page });
	};

	handleSort = sortColumn => {
		this.setState({ sortColumn });
	};

	handleChange = keywords => {
		this.setState({
			searchKeywords: keywords,
			selectedGenre: null,
			currentPage: 1,
		});
	};

	render() {
		const { length: count } = this.state.movies;
		const {
			pageSize,
			currentPage,
			genres,
			sortColumn,
			selectedGenre,
		} = this.state;

		 //if (count === 0) return <p>There are no movies in database</p>;

		const { totalCount, data: movies } = this.getPagedData();
		const { searchKeywords } = this.state;

		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						genres={genres}
						genreSelect={this.onGenreSelect}
						selectedGenre={selectedGenre}
					/>
				</div>
				<div className="col">
					{this.props.user && <Link
						to="/movies/new"
						className="btn btn-primary"
						style={{ marginBottom: 20 }}
					>
						New Movie
					</Link>}
					<SearchBar value={searchKeywords} onChange={this.handleChange} />

					<p>Showing {totalCount} movies in Database</p>

					<MovieTable
						movies={movies}
						sortColumn={sortColumn}
						onSort={this.handleSort}
						onDelete={this.handleDelete}
						onLike={this.handleLike}
						onDownload={this.handleDownload}
					/>
					<ToastContainer
						transition={Bounce}
						autoClose={2000}
						position="top-left"
					/>

					<Pagination
						pageSize={pageSize}
						totalMovies={totalCount}
						pageChange={this.handlePageChange}
						currentPage={currentPage}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
