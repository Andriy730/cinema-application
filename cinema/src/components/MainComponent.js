import React, { Component } from "react";
import Header from "./HeaderComponent";
import Home from './HomeComponent';
import Login from './LoginComponent';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Contacts from './ContactsComponent';
import { connect } from "react-redux";
import { fetchMovies, loginUser, logoutUser } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { Soon } from "./SoonComponent";
import { MovieDetail } from "./MovieDetailComponent";

const mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user.user
    };
}

const mapDispatchToProps = (dispatch) => ({
    fetchMovies: () => dispatch(fetchMovies()),
    loginUser: (values) => dispatch(loginUser(values.username, values.password)),
    logoutUser: () => dispatch(logoutUser()),
    resetFeedbackForm: () => dispatch(actions.reset('feedback')),
    resetLoginForm: () => dispatch(actions.reset('login'))
});

class Main extends Component {

    componentWillMount() {
        this.props.fetchMovies();
    }

    render() {
        const MovieWithId = ({match}) => {
            return(
                <MovieDetail movie={this.props.movies.movies.filter((movie) => movie.id === parseInt(match.params.movieId, 10))[0]}
                    isLoading={this.props.movies.isLoading}
                    errMess={this.props.movies.errMess}
                    />
            )
        }
        return(
            <div>
                <Header user={this.props.user} logoutUser={this.props.logoutUser} />
                <Switch>
                    <Route path="/home" component={() => <Home movies={this.props.movies} />} />
                    <Route path="/soon" component={() => <Soon movies={this.props.movies} />} />
                    <Route path="/contacts" component={() => <Contacts resetFeedbackForm={this.props.resetFeedbackForm}/>} />
                    <Route path="/login" component={() => <Login resetLoginForm={this.props.resetLoginForm} loginUser={this.props.loginUser} user={this.props.user} />} />
                    <Route path="/user" user={this.props.user} />
                    <Route path="/movie/:movieId" component={MovieWithId} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));