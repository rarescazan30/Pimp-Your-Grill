import React from 'react';
import HeroNoText from '../components/HeroNoText';
import PostGrillForm from '../components/PostGrillForm';

function PostGrill() {
  return (
    <div className="register-page-container">
        <PostGrillForm />
        <HeroNoText />
    </div>
  )
}

export default PostGrill;