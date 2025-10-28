# Book Explorer

Book Explorer is a React-based web application that allows users to search for books using the Google Books API, view detailed book information, and manage a personal list of favorite books.

## Features
- Multi-field search (title, author, keyword)
- Responsive grid/list for results
- Book details page (with unique URL)
- Favorites management (add/remove, dedicated page)
- Routing and navigation (React Router)
- Form validation and error messages
- Mobile optimizations
- Robust error handling
- Semantic HTML and accessibility
- Performance optimizations (memoization, code-splitting)

## Getting Started

### Setup
1. Clone the repository
2. Run `npm install`
3. Run `npm start` to launch the app at [http://localhost:3000](http://localhost:3000)

### Testing
Run `npm test` to execute the test suite (Jest + React Testing Library).

## Approach
- **State Management:** Redux Toolkit for books and favorites
- **Routing:** React Router v6 for navigation and dynamic routes
- **Form Handling:** Controlled components, validation, user-friendly error messages
- **Error Handling:** All API/network failures handled gracefully with clear UI feedback
- **Performance:** Components memoized with `React.memo` and `useMemo`; book details page code-split with `React.lazy`/`Suspense`
- **Accessibility:** Semantic HTML, ARIA attributes, keyboard navigation, and focus management

## Performance Notes
- Book details page is lazy-loaded for faster initial load
- Book cards and details are memoized to avoid unnecessary re-renders

## Folder Structure
- `src/components/` — UI components
- `src/features/` — Redux slices and API logic
- `src/pages/` — Main pages (Home, Favorites, BookDetails)
- `src/routes/` — App routing

## Trade-offs
- Modal overlay for book details and TypeScript support are optional and not included
- Notes/tags for favorites are not included per requirements

## License
MIT

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
