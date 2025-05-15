// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Meal from './pages/Meal';
import About from './pages/About';
import Layout from './components/Layout';
import Categories from './pages/Categories';
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<Meal />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;