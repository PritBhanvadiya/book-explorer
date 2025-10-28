import './App.css';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header/Header';

function App() {
  return (
    <div role="application">
      <Header />
      <main role="main">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
