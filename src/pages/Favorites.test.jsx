import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Favorites from './Favorites';
import Card from '../components/Card/Card';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureStore([]);

const book = {
  id: 'testid',
  volumeInfo: {
    title: 'Test Book',
    authors: ['Author One'],
    description: 'A test book description.',
    imageLinks: { thumbnail: 'https://via.placeholder.com/128x192' },
  },
};

describe('Favorites Page', () => {
  it('shows empty state when no favorites', () => {
    const store = mockStore({ favorites: [] });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Favorites />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/no favorite books yet/i)).toBeInTheDocument();
  });

  it('renders favorite books', () => {
    const store = mockStore({ favorites: [book] });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Favorites />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Author One')).toBeInTheDocument();
    expect(screen.getByAltText('Test Book')).toBeInTheDocument();
  });
});
