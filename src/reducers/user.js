import { USER_SIGNUP, USER_LOGOUT } from '../actions/types';

const INITIAL_STATE = {};

const user = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_SIGNUP:
			return { ...state, ...action.payload };
		case USER_LOGOUT:
			return { ...INITIAL_STATE };
		default:
			return state;
	}
};
export default user;
