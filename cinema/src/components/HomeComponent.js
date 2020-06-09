import React, { Component } from 'react';
import $ from 'jquery'
import Slider from 'react-slick';
import { Loading } from './LoadingComponent';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../style/components/carousel.scss';

const RenderMovie = ({movie, width, height}) => {
    return(
        <Col key={movie.id} md={4} lg={3} className="px-0">
            <div className="item">
                <Link to={`/movie/${movie.id}`} className="link" >
                    <img className="d-block" src={movie.image} width={width} height={height} />
                </Link>
            </div>
        </Col>
    );
}

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posterHeight: window.innerHeight,
            posterWidth: window.innerWidth
        }
        
        this.setSize = this.setSize.bind(this);
    }

    setSize() {
        let numberOfPosters = 1;

        if(window.innerWidth > 480) {
            numberOfPosters = 2;
        }
        if(window.innerWidth > 600) {
            numberOfPosters = 3;
        }
        if(window.innerWidth > 1024) {
            numberOfPosters = 4;
        }

        this.setState({
            posterWidth: window.innerWidth / numberOfPosters
        });
        
        let navHeight = $("nav").height();
        console.log(navHeight);

        this.setState({
            posterHeight: 0.982 * (window.innerHeight - navHeight)
        });
      }
    
    componentDidMount() {
        this.setSize();
        window.addEventListener('resize', this.setSize);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.setSize);
    }

    render() {

        if(this.props.movies.isLoading) {
            return(
                <div className="container my-auto">
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
                        <h4>{this.props.movies.err}</h4>
                    </Row>
                </div>
            );
        }
        else {
            const settings = {
                dots: false,
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                initialSlide: 0,
                responsive: [
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                    }
                  },
                  {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      initialSlide: 2
                    }
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                    }
                  }
                ]
              };
            return(
                <Slider {...settings} >
                    {this.props.movies.movies.filter((movie) => new Date(movie.releaseDate) <= new Date()).map((movie) => {
                        return(
                            <RenderMovie movie={movie} width={this.state.posterWidth} height={this.state.posterHeight} />
                        );
                    })}
                </Slider>
            );
        }
    }
}

export default Home;