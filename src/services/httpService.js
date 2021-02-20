import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
	const expectedErrors =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expectedErrors) {
		console.log('Unexpected error', error);
		toast.error('Unexpected error occured');
	}
	return Promise.reject(error);
});

function setJwt(jwt) {
	axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
	get: axios.get,
	put: axios.put,
	delete: axios.delete,
	post: axios.post,
	setJwt,
};
