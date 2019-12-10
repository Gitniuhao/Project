import {combineReducers} from 'redux-immutable'
import { reducer as LoginReducer } from 'pages/login/store/index.js'

export default combineReducers({
    login:LoginReducer
})
