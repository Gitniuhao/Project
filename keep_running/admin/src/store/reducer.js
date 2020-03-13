import {combineReducers} from 'redux-immutable'
import { reducer as loginReducer } from 'pages/login/store'
import { reducer as homeReducer } from 'pages/home/store'
import { reducer as adminReducer } from 'pages/admins/store'
import { reducer as userReducer } from 'pages/user/store'
import { reducer as articleReducer } from 'pages/article/store'

export default combineReducers({
    login:loginReducer,
    home:homeReducer,
    admin:adminReducer,
    user:userReducer,
    article:articleReducer
})
