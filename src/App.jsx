import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Products from './Products';
import AboutUs from './AboutUs';
import Contact from './Contact';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />

        {/* Main Website Routes */}
        <Route path='*' element={
          <>
            <header className='header'>
              <img src="revo tech logo-01.png" alt="Revo Technologies Logo" className='logo' />
              <h1>Revo Technologies</h1>
              <nav>
                <NavLink to='/' className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
                <NavLink to='/products' className={({ isActive }) => isActive ? "active" : ""}>Services/Products</NavLink>
                <NavLink to='/aboutus' className={({ isActive }) => isActive ? "active" : ""}>About Us</NavLink>
                <NavLink to='/contact' className={({ isActive }) => isActive ? "active" : ""}>Contact Us</NavLink>
              </nav>
            </header>

            <main className="Content">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products' element={<Products />} />
                <Route path='/aboutus' element={<AboutUs />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='*' element={<h2>404: Page Not Found</h2>} />
              </Routes>
            </main>

            <footer className='footer'>
              <p className="read-the-docs">
                Product of Revo Technologies © 2025. All rights reserved.
              </p>
            </footer>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;