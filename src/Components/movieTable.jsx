import React, { Component } from 'react';
import Like from '../Components/common/like';
import CloudDownload from '../Components/common/cloudDownload';
import auth from "../services/authService"
import Table from './common/table';

const userLoggedIn = auth.getCurrentUser();

class MovieTable extends Component {
	columns = [
		{ path: 'title', label: 'Title' },
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'numberInStock', label: 'Stock' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{
			key: 'Like',
			content: movie => ( userLoggedIn &&
				<Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
				),
			},
			{
				key: 'Download',
				content: movie => ( userLoggedIn &&
					<CloudDownload
					download={movie.download}
					onClick={() => this.props.onDownload(movie)}
					/>
					),
		},
		{
			key: 'Delete',
			content: movie => ( userLoggedIn && userLoggedIn.isAdmin &&
				<button
				onClick={() => {
					this.props.onDelete(movie._id);
				}}
				className="btn btn-danger btn-sm"
				>
					Delete
				</button>
			),
		},
	];

	render() {
		const { movies, sortColumn, onSort } = this.props;
		return (
			<Table
				data={movies}
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
				user={this.props.user}
			/>
		);
	}
}

export default MovieTable;
