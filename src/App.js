import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BookDetailsPage from './pages/BookDetailPage';

function App() {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/book/:id' element={<BookDetailsPage/>} />
    </Routes>
  </Router>
  );
}

export default App;
