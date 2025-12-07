import React from 'react';
import HeroNoText from '../components/HeroNoText';
import EditGrillForm from '../components/EditGrillForm';

function EditGrill() {
  return (
    <div className="register-page-container post-grill-page">
        <EditGrillForm />
        <HeroNoText />
    </div>
  )
}

export default EditGrill;