import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import FormMain from './FormMain';
import { getBooks, setQuery } from '../../features/books/booksSlice';

// Mock react-redux hooks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock Redux actions
jest.mock('../../features/books/booksSlice', () => ({
  getBooks: jest.fn(),
  setQuery: jest.fn(),
}));

describe('FormMain Component', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders input and button', () => {
    useSelector.mockImplementation((selector) => {
      if (selector.name === 'selectBooksQuery') return '';
      if (selector.name === 'selectBooksStatus') return 'idle';
      if (selector.name === 'selectAllBooks') return [];
      if (selector.name === 'selectBooksError') return null;
    });

    render(<FormMain />);

    expect(screen.getByPlaceholderText(/search book here/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('shows error when submitting empty query', () => {
    useSelector.mockImplementation((selector) => {
      if (selector.name === 'selectBooksQuery') return '';
      if (selector.name === 'selectBooksStatus') return 'idle';
      if (selector.name === 'selectAllBooks') return [];
      if (selector.name === 'selectBooksError') return null;
    });

    render(<FormMain />);

    fireEvent.submit(screen.getByRole('search') || screen.getByRole('button', { name: /search/i }));

    expect(screen.getByText(/please enter a search term/i)).toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('dispatches getBooks when query is valid', () => {
    useSelector.mockImplementation((selector) => {
      if (selector.name === 'selectBooksQuery') return 'react';
      if (selector.name === 'selectBooksStatus') return 'idle';
      if (selector.name === 'selectAllBooks') return [];
      if (selector.name === 'selectBooksError') return null;
    });

    render(<FormMain />);

    const form = screen.getByRole('search') || screen.getByRole('button', { name: /search/i });
    fireEvent.submit(form);

    expect(mockDispatch).toHaveBeenCalledWith(getBooks('react'));
  });

  test('dispatches setQuery when typing', () => {
    useSelector.mockImplementation((selector) => {
      if (selector.name === 'selectBooksQuery') return '';
      if (selector.name === 'selectBooksStatus') return 'idle';
      if (selector.name === 'selectAllBooks') return [];
      if (selector.name === 'selectBooksError') return null;
    });

    render(<FormMain />);

    const input = screen.getByPlaceholderText(/search book here/i);
    fireEvent.change(input, { target: { value: 'react' } });

    expect(mockDispatch).toHaveBeenCalledWith(setQuery('react'));
  });
});
