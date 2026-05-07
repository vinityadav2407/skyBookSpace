import React from 'react';
export default function LinearGradient({ colors, style, children }) {
  return (
    <div style={{
      background: `linear-gradient(${colors?.join(',') ?? '#fff,#fff'})`,
      ...style
    }}>
      {children}
    </div>
  );
}