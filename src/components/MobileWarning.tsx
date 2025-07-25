import React, { useState, useEffect } from 'react';
import './MobileWarning.css';

const MobileWarning: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['mobile', 'android', 'iphone', 'ipod', 'blackberry', 'windows phone'];
      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword));

      // Also check screen width as an additional indicator
      const isSmallSize = window.innerWidth <= 768;

      // Check if device supports touch
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      // Consider it mobile if it matches mobile user agent OR (small screen AND touch)

      const isMobile = isMobileDevice || (isSmallSize && isTouchDevice);
      const isSmallScreen = isMobileDevice || (isSmallSize);

      setIsMobile(isMobile || isSmallScreen);
    };

    checkIfMobile();

    // Listen for window resize to handle orientation changes
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleContinue = () => {
    setShowWarning(false);
  };

  if (!isMobile || !showWarning) {
    return null;
  }

  return (
    <div className="mobile-warning-overlay">
      <div className="mobile-warning-modal">
        <div className="mobile-warning-content">
          <h2>Small Screen Detected</h2>
          <p className="warning-text">
            Please open this website on a computer to see the visualizations,
            the website doesn't work well with small displays.
          </p>
          <p className="warning-subtext">
            But if you wish to see anyway make sure to use landscape orientation.
          </p>
          <button
            className="continue-button"
            onClick={handleContinue}
          >
            I want to see anyway
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileWarning;
