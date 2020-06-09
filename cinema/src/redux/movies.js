import * as ActionTypes from './ActionTypes';

export const Movies = (state = {
        isLoading: true,
        errMess: null,
        movies: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MOVIES:
            return {...state, isLoading: false, errMess: null, movies: action.payload};

        case ActionTypes.MOVIES_LOADING:
            return {...state, isLoading: true, errMess: null, movies: []};
        
        case ActionTypes.MOVIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, movies: []};
        
        case ActionTypes.ADD_MOVIE:
            let movie = action.payload;
            return {...state, movies: state.movies.concat(movie)};

        default:
            return state
    }
}