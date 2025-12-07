import React from 'react';
import HeroNoText from '../components/HeroNoText';
import ResetPasswordForm from '../components/ResetPasswordForm';

function ResetPassword() {
  return (
    <div className="register-page-container">
        <ResetPasswordForm />
        <HeroNoText />
    </div>
  )
}

export default ResetPassword;