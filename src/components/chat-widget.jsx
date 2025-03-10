"use client";

import { useEffect, useState, useRef } from 'react';

export const ChatWidget = () => {
  const [showTooltip, setShowTooltip] = useState(false); // Tooltip initially hidden
  const [showWidget, setShowWidget] = useState(false);  // Widget initially hidden
  const audioRef = useRef(null); // Ref for the audio element

  // Function to play the pop sound
  const playPopSound = () => {
    if (audioRef.current) {
      console.log('Attempting to play sound...');
      audioRef.current.play().catch(error => {
        console.error('Error playing sound:', error);
      });
    }
  };

  useEffect(() => {
    // Delay showing the chat widget by 4 seconds
    const widgetTimeout = setTimeout(() => {
      setShowWidget(true); // Show the widget after 4 seconds
      playPopSound(); // Play pop sound when widget appears
    }, 4000);

    // Delay showing the tooltip by an additional 2 seconds (after widget appears)
    const tooltipTimeout = setTimeout(() => {
      setShowTooltip(true); // Show tooltip 2 seconds after widget
    }, 6000); // Total delay is 6 seconds (4s for widget + 2s extra for tooltip)

    return () => {
      clearTimeout(widgetTimeout); // Cleanup on unmount
      clearTimeout(tooltipTimeout); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    if (showWidget) {
      const script = document.createElement('script');
      const BASE_URL = "http://chatwoot-rails-api-service:80";
      const CDN_URL = "https://chat-widget.hiverhq.com/chat-widget";
      
      script.src = `${CDN_URL}/js/sdk.js`;
      script.defer = true;
      script.async = true;

      script.onload = () => {
        window.chatwootSDK.run({
          websiteToken: 'Fk1XbF7vNoRhD3bLkFoWRDg5',
          baseUrl: BASE_URL
        });

        // Hide the tooltip after 5 more seconds
        setTimeout(() => setShowTooltip(false), 5000);
      };

      document.body.appendChild(script);

      // Cleanup the script when the component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showWidget]);

  return (
    <>
      {/* Chatwoot Widget will appear first */}
      {showWidget && (
        <div id="chatwoot-widget" />
      )}

      {/* Tooltip will appear after a delay */}
      {showTooltip && (
        <div className="chat-tooltip">
          Welcome to West Can Auto Parts! How can we help you today?
        </div>
      )}

      {/* Hidden audio element to play the pop sound */}
      <audio ref={audioRef} src="https://res.cloudinary.com/dpeocx0yy/video/upload/v1726134490/happy-pop-2-185287_gvt2xf.mp3" preload="auto" auto/>
    </>
  );
};
