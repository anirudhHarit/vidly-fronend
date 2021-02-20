import http from '../services/httpService';
import jwtDecode from 'jwt-decode';
//import { apiUrl } from '../config.json';

const apiEndPoint = '/auth';
const tokenKey = 'token';

async function login(email, password) {
	const { data: jwt } = await http.post(apiEndPoint, {
		email,
		password,
	});
	localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt) {
	localStorage.setItem(tokenKey, jwt);
}

function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(tokenKey);
		return jwtDecode(jwt);
	} catch (ex) {
		return null;
	}
}

function logout() {
	localStorage.removeItem(tokenKey);
}

http.setJwt(getJwt());

function getJwt() {
	return localStorage.getItem(tokenKey);
}

export default {
	login,
	logout,
	getCurrentUser,
	loginWithJwt,
	getJwt,
};
