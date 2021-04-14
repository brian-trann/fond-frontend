import { USER_LOGIN, USER_SIGNUP, USER_LOGOUT } from './types';
import FondApi from '../api';

const getUserLoginToken = (data) => {
	return async function(dispatch) {
		const res = await FondApi.login(data);
		dispatch(gotLoginToken(res));
	};
};
const gotLoginToken = (data) => {
	return { type: USER_LOGIN, payload: data };
};

const getUserSignupToken = (data) => {
	return async function(dispatch) {
		const res = await FondApi.signup(data);
		dispatch(gotSignupToken(res));
	};
};
const gotSignupToken = (data) => {
	return { type: USER_SIGNUP, payload: data };
};
const userLogout = () => {
	return { type: USER_LOGOUT };
};

export { getUserLoginToken, getUserSignupToken, userLogout };
