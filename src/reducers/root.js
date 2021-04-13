import { combineReducers } from 'redux';
import recipes from './recipes';
import user from './user';

export default combineReducers({ recipes, user });
