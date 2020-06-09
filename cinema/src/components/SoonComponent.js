import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import '../style/components/soon.scss';

const Movies = (movies) => {
    if(movies) {
        const moviesList = movies.movies.map((movie) => {
            return(
                <Col key={movie.id} xs={6} md={3} lg={2}>
                    <Link to={`/movie/${movie.id}`} className="link">
                        <img className="mini-poster" src={movie.image} width="230" height="340" />
                        <p className="subtitle">{movie.title}</p>
                    </Link>
                </Col>
            );
        });
        return(
            <Row className="col-12 col-lg-10 movies-right">
                {moviesList}
            </Row>
        );
    }
    else {
        return(
            <div></div>
        );
    }
}

export class Soon extends Component {

    constructor(props) {
        super(props);

        this.months = ['Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'];
    }

    render() {
        if(this.props.movies.isLoading) {
            return(
                <div className="container">
                    <Row>
                        <Loading />
                    </Row>
                </div>
            );
        }
        else if(this.props.movies.errMess) {
            return(
                <div className="container">
                    <Row>
                        <h4>{this.props.movies.errMess}</h4>
                    </Row>
                </div>
            );
        }
        else {
            const filteredMovies = this.props.movies.movies.filter(movie => new Date(movie.releaseDate) > new Date());
            const movies = Array.from(new Set(filteredMovies.map(movie => movie.releaseDate))).map(releaseDate => {
                const date = new Date(releaseDate);
                return(
                    <Row className="pt-3 pb-3 mx-0">
                        <Col lg={1} className="pl-3">
                            <p className="date-title">{date.getDate() + " " + this.months[date.getMonth()]}</p>    
                        </Col>
                        <Movies movies={filteredMovies.filter(movie => movie.releaseDate == releaseDate)} />
                    </Row>
                );
            });
            return(
                <div className="movies">
                    {movies}
                </div>    
            );
        }
    }
}