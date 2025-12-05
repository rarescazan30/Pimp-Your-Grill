import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CTA from './components/CallToAction';
import Showcase from './components/PeterAndGrills';
import './App.css';
import Footer from './components/Footer';



function App() {
  return (

    <div className="app-container">

      <Navbar /> 
      

      <Hero /> 

      <CTA />

      <Showcase />

      <Footer />

      
    </div>
  )
}

export default App