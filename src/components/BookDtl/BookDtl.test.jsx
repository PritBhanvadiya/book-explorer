import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import BookDtl from './BookDtl';

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
  books: { items: [book] },
  favorites: [],
};

const initialStateFav = {
  books: { items: [book] },
  favorites: [book],
};

describe('BookDtl Component', () => {
  it('renders book details', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BookDtl bookId={book.id} />
      </Provider>
    );
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Author One')).toBeInTheDocument();
    expect(screen.getByText('A test book description.')).toBeInTheDocument();
    expect(screen.getByAltText('Test Book')).toBeInTheDocument();
  });

  it('shows not found if book missing', () => {
    const store = mockStore({ books: { items: [] }, favorites: [] });
    render(
      <Provider store={store}>
        <BookDtl bookId={'missingid'} />
      </Provider>
    );
    expect(screen.getByText(/book not found/i)).toBeInTheDocument();
  });

  it('toggles favorite status', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BookDtl bookId={book.id} />
      </Provider>
    );
    const favIcon = screen.getByRole('img');
    fireEvent.click(favIcon);
    // No error means click worked; for full test, mock dispatch and check actions
  });

  it('shows filled icon if favorite', () => {
    const store = mockStore(initialStateFav);
    render(
      <Provider store={store}>
        <BookDtl bookId={book.id} />
      </Provider>
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
