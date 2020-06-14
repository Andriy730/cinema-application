import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MovieDetail } from './components/MovieDetailComponent';


describe('Login', () => {
    it('render movie', () => {
        const movie = {
            title: "Title",
            age: 12,
            originalTitle: "TitleOriginal",
            director: {
                name: "director"
            },
            releaseDate: "2020-05-05",
            genres: [],
            actors: [],
            duration: 120,
            country: "Ukraine",
            studio: "Pomoika",
            scenario: "scenario",
            description: "Description",
            image: ""
        };
        render(<MovieDetail movie={movie} isLoading={false} errMess={null} />);
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText("12+")).toBeInTheDocument();
    })
})
