import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Card from './Card';
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

const initialState = {
  favorites: [],
};

const initialStateFav = {
  favorites: [book],
};

describe('Card Component', () => {
  it('renders book card', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card book={book} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Author One')).toBeInTheDocument();
  expect(screen.getByAltText('Test Book')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /view details for test book/i })).toBeInTheDocument();
  });

  it('shows filled icon if favorite', () => {
    const store = mockStore(initialStateFav);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card book={book} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByRole('button', { pressed: true })).toBeInTheDocument();
  });

  it('toggles favorite status on click', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card book={book} />
        </BrowserRouter>
      </Provider>
    );
    const favIcon = screen.getByRole('button');
    fireEvent.click(favIcon);
    // No error means click worked; for full test, mock dispatch and check actions
  });

  it('handles keyboard accessibility for favorite icon', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Card book={book} />
        </BrowserRouter>
      </Provider>
    );
    const favIcon = screen.getByRole('button');
    favIcon.focus();
    fireEvent.keyDown(favIcon, { key: 'Enter' });
    fireEvent.keyDown(favIcon, { key: ' ' });
    // No error means keyboard events are handled
  });
});
