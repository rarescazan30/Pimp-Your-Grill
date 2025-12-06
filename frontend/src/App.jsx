import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import PostGrill from './pages/PostGrill';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/post-grill' element={<PostGrill />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App