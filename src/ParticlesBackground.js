import React, { useEffect } from 'react';
import useParticles from './useParticles';

const ParticlesBackground = () => {
  useParticles("particles-js");

  return (
    <div 
      id="particles-js" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundColor: '#1a1a1a'
      }}
    />
  );
};

export default ParticlesBackground;