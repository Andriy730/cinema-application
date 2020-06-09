import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/BaseUrl';

export const fetchMovies = () => (dispatch) => {
    dispatch(moviesLoading());

    return fetch(baseUrl + "movies/")
        .then(response => {
            if(response.ok) {
                return response;
            }
            else {
                let error = new Error('Error ' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(movies => dispatch(addMovies(movies)))
        .catch(error => dispatch(moviesFailed(error.message)));
}

export const moviesLoading = () => ({
    type: ActionTypes.MOVIES_LOADING
});

export const addMovies = (movies) => ({
    type: ActionTypes.ADD_MOVIES,
    payload: movies
});

export const moviesFailed = (errMess) => ({
    type: ActionTypes.MOVIES_FAILED,
    payload: errMess
});

export const addMovie = (movie) => ({
    type: ActionTypes.ADD_MOVIE,
    payload: movie
});

export const loginUser = (username, password) => (dispatch) => {
    const credentials = {
        username: username, 
        password: password
    };
    
    return fetch(baseUrl + "auth/sign-in/", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        let errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(response => dispatch(fetchUserInfo(response)))
    .catch(error => console.log("Login Failed with error: " + error.message));
}

const fetchUserInfo = (authInfo) => (dispatch) => {
    return fetch(baseUrl + "users/" + authInfo.username, {
        headers: {
            'Authorization': 'Bearer_' + authInfo.token
        }
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        let errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(response => dispatch(addUser({...response, 'token': authInfo.token})))
    .catch(error => {
        console.log("Fetch user Failed with error: " + error.message);
        dispatch(userFailed(error.message));
    });
}

const addUser = (userInfo) => ({
    type: ActionTypes.ADD_USER,
    payload: userInfo
});

const userFailed = (errMess) => ({
    type: ActionTypes.USER_FAILED,
    payload: errMess
});

export const logoutUser = () => ({
    type: ActionTypes.LOGOUT_USER,
});