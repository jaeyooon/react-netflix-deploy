import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';


const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />

      <Footer />
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=':movieId' element={<DetailPage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
