import React from 'react';
import ProfileInfo from '../components/ProfileInfo';
import MyGrills from '../components/MyGrills';
import HeroNoText from '../components/HeroNoText';

function Profile() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '50px' }}>
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 0 }}>
        <HeroNoText />
      </div>
      
      <ProfileInfo />
      <MyGrills />
      
    </div>
  );
}

export default Profile;