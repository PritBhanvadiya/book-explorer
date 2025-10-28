import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import AppRoutes from './AppRoutes';

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
  books: { items: [book], status: 'succeeded', error: null, query: '' },
  favorites: [book],
};

describe('AppRoutes', () => {
  it('renders Home page by default', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByPlaceholderText(/search book here/i)).toBeInTheDocument();
  });

  it('renders Favorites page', () => {
    const store = mockStore(initialState);
    window.history.pushState({}, '', '/favorites');
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Author One')).toBeInTheDocument();
  });

  it('renders BookDetails page', () => {
    const store = mockStore(initialState);
    window.history.pushState({}, '', `/books/testid`);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    );
    return Promise.all([
      screen.findByText('Test Book'),
      screen.findByText('Author One'),
      screen.findByText('A test book description.')
    ]).then(([title, author, desc]) => {
      expect(title).toBeInTheDocument();
      expect(author).toBeInTheDocument();
      expect(desc).toBeInTheDocument();
    });
  });

  it('renders 404 page for unknown route', () => {
    const store = mockStore(initialState);
    window.history.pushState({}, '', '/unknown');
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/404 page not found/i)).toBeInTheDocument();
  });
});
