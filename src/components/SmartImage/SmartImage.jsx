import { useState } from 'react';
import './SmartImage.css';

// A normal <img>, but if the image fails to load it shows a
// friendly placeholder instead of a broken image icon.
export default function SmartImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`smart-image smart-image--fallback ${className}`} role="img" aria-label={alt}>
        <span>◇</span>
        <p>Image unavailable</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`smart-image ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
