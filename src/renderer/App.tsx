import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import Home from './pages/Home';
import rootStore from './store/rootStore';
import UnwatchedMovies from './pages/UnwatchedMovies';
import AllMovies from './pages/AllMovies';

export default function App() {
  return (
    <div className="w-screen h-screen bg-slate-200 dark:bg-slate-600">
      <Provider store={rootStore}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/unwatched-movies" element={<UnwatchedMovies />} />
            <Route path="/all-movies" element={<AllMovies />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}
