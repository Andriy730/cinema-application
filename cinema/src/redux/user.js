import * as ActionTypes from './ActionTypes';

export const User = (state = {
        errMess: null,
        user: null
    }, action) => {
        switch(action.type) {
            case ActionTypes.ADD_USER:
                return {...state, errMess:null, user: action.payload};
            
            case ActionTypes.USER_FAILED:
                return {...state, errMess: action.payload, user: null};
            
            case ActionTypes.LOGOUT_USER:
                return {...state, errMess: null, user: null};

            default:
                return state;
        }
    }