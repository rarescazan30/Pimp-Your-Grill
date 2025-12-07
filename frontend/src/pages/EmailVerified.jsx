import React from 'react';
import HeroNoText from '../components/HeroNoText';
import EmailVerifiedMessage from '../components/EmailVerifiedMessage';

function EmailVerified() {
  return (
    <div className="register-page-container">
        <EmailVerifiedMessage />
        <HeroNoText />
    </div>
  )
}

export default EmailVerified;