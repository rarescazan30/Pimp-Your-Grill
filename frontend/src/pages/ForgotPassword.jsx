import React from 'react';
import HeroNoText from '../components/HeroNoText';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

function ForgotPassword() {
  return (
    <div className="register-page-container">
        <ForgotPasswordForm />
        <HeroNoText />
    </div>
  )
}

export default ForgotPassword;