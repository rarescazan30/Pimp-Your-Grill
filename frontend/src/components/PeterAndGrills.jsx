import './PeterAndGrills.css';

import peterGriffinImage from '../assets/petergratareGrouped.png'; 

export default function Showcase() {
  return (
    <section className="showcase-container">
        
        <div className="peter-section">
            <img 
                src={peterGriffinImage}
                alt="Peter Griffin" 
                className="peter-image" 
            />
        </div>
    </section>
  );
}