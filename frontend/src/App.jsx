import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import PostGrill from './pages/PostGrill';
import EditGrill from './pages/EditGrill';
import BestGrills from './pages/BestGrills';
import ScrollToTop from './components/ScrollToTop';
import EmailVerified from './pages/EmailVerified';
import ResetPassword from './pages/ResetPassword';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
      <Navbar /> 
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/post-grill' element={<PostGrill />} />
        <Route path='/edit-grill/:id' element={<EditGrill />} />
        <Route path='/best-grills' element={<BestGrills />} />
        <Route path='/email-verified' element={<EmailVerified />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App