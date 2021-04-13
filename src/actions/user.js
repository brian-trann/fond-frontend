import { USER_LOGIN, USER_SIGNUP } from './types';
import FondApi from '../api';

const getUserLoginToken = (data) => {
	return async function(dispatch) {
		const res = await FondApi.login(data);
		dispatch(gotLoginToken(res));
	};
};
const gotLoginToken = (token) => {
	return { type: USER_LOGIN, payload: token };
};

const getUserSignupToken = (data) => {
	return async function(dispatch) {
		const res = await FondApi.signup(data);
		dispatch(gotSignupToken(res));
	};
};
const gotSignupToken = (token) => {
	return { type: USER_SIGNUP, payload: token };
};

export { getUserLoginToken, getUserSignupToken };
