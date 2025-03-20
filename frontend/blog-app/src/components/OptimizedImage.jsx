import React, { useState, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  style = {}, 
  maxWidth = '100%',
  maxHeight = 'auto',
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Preload image
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  if (error) {
    return (
      <div 
        className={`${className} bg-light  d-flex align-items-center justify-content-center`}
        style={{ 
          ...style,
          minHeight: '200px',
          maxWidth,
          maxHeight
        }}
      >
        <span className="text-muted">Image not available</span>
      </div>
    );
  }

  return (
    <div 
      className={`${className} position-relative`}
      style={{ 
        ...style,
        maxWidth,
        maxHeight,
        backgroundColor: '#f8f9fa',
        overflow: 'hidden'
      }}
    >
      {!isLoaded && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          ...style,
          maxWidth: '100%',
          height: 'auto',
          transition: 'opacity 0.3s ease-in-out',
          objectFit: 'cover'
        }}
        loading={loading}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default OptimizedImage; 