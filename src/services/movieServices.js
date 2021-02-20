import http from '../services/httpService';
//import { apiUrl } from '../config.json';

export function getMovies() {
	return http.get(`/movies`);
}

function getMovieUrl(id) {
	if (!id) return `/movies`;
	return `/movies/${id}`;
}

export function deleteMovie(movieId) {
	return http.delete('/movies/' + movieId);
}
export async function saveMovie(movie) {
	if (movie._id) {
		const body = { ...movie };
		delete body._id;
		return http.put(getMovieUrl(movie._id), body);
	} else {
		return http.post(getMovieUrl(), movie);
	}
}
