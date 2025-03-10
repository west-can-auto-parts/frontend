"use client"

import React, { useEffect } from 'react';

export const WhatsAppChatWidget = () => {
  useEffect(() => {
    // Dynamically load the WhatsApp widget script
    const script = document.createElement('script');
    script.src = "https://waw.gallabox.com/whatsapp-widget.min.js?_=" + Math.random();
    script.async = true;

    // Set up widget configuration
    window.gbwawc = {
      url: "https://waw.gallabox.com",
      options: {
        waId: "+1 6045948800",
        siteName: "West Can Auto Parts",
        siteTag: "Available",
        siteLogo: "https://westcanauto.com/wp-content/uploads/2023/05/WestCanAP_logoNOUSI-300x156.png",
        widgetPosition: "LEFT",
        triggerMessage: "Message Us",
        welcomeMessage: "Welcome to West Can Auto Parts",
        brandColor: "#25D366",
        messageText: "",
        replyOptions: ["", "", "", ""], // Empty reply options array
      },
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return null; // No need to render anything
};

