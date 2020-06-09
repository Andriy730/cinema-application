import React from 'react';
import { Row, Col } from 'reactstrap';
import { Loading } from './LoadingComponent';

const RenderMovieDetail = ({movie}) => {
    let age = "0+";
    if(movie.age != 0) {
        age = movie.age + "+";
    }
    const genres = movie.genres.reduce((accumulator, currentVal) => accumulator += currentVal.name + ", ", "").slice(0, -2);
    const actors = movie.actors.reduce((accumulator, currentVal) => accumulator += currentVal.name + ", ", "").slice(0, -2);
    return(
        <Col md={9}>
            <h1>{movie.title}</h1>
            <ul className="list-unstyled">
                <li className="row">
                    <p className="col-5 col-md-3">Вік:</p>
                    <p className="col-7 col-md-9">{age}</p>
                </li>
                <li className="row">
                    <p className="col-5 col-md-3">Оригінальна Назва:</p>
                    <p className="col-7 col-md-9">{movie.originalTitle}</p>
                </li>
                <li className="row">
                    <p className="col-5 col-md-3">Режисер:</p>
                    <p className="col-7 col-md-9">{movie.director.name}</p>
                </li>
                <li className="row">
                    <p className="col-5 col-md-3">Дата Виходу:</p>
                    <p className="col-7 col-md-9">{movie.releaseDate.split("-").reverse().join(".")}</p>
                </li>
                <li className="row">
                    <p className="col-5 col-md-3">Мова:</p>
                    <p className="col-7 col-md-9">Українська</p>
                </li>
                <li className="row">
                    <p className="col-5 col-md-3">Жанр:</p>
                    <p className="col-7 col-md-9">{genres}</p>
                </li>
                <li className="row">
                    <p className="col-5 col-md-3">Тривалість:</p>
                    <p className="col-7 col-md-9">{movie.duration} хв</p>
                </li>
                <li className="row">
                    <p className="col-5 col-md-3">Виробництво:</p>
                    <p className="col-7 col-md-9">{movie.country}</p>
                </li>
                <li className="row">
                    <p className="col-5 col-md-3">Студія:</p>
                    <p className="col-7 col-md-9">{movie.studio}</p>
                </li>
                <li className="row">
                    <p className="col-5 col-md-3">Сценарій:</p>
                    <p className="col-7 col-md-9">{movie.scenario}</p>
                </li>
                <li className="row">
                    <p className="col-5 col-md-3">У головних ролях:</p>
                    <p className="col-7 col-md-9">{actors}</p>
                </li>
            </ul>
            <p>
                {movie.description}
            </p>
        </Col>
    );
}

export const MovieDetail = (props) => {
    if(props.isLoading) {
        return(
            <div className="container my-auto">
                <Row>
                    <Loading />
                </Row>
            </div>
        );
    }
    else if(props.errMess) {
        return (
            <div className="container">
                <Row>
                    <h4>{props.errMess}</h4>
                </Row>
            </div>
        );
    }
    else {
        return(
            <div className="container movie-description mt-1 mt-lg-2">
                <Row>
                    <Col md={3}>
                        <img className="mini-poster" src={props.movie.image} alt="poster" height="375" width="250" />
                    </Col>
                    <RenderMovieDetail movie={props.movie} />
                </Row>
            </div>
        );
    }
}