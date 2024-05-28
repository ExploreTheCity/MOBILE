import React from "react";

export default function Maps({ latitude, longitude }) {
  const mapSrc = `https://www.google.com/maps/embed/v1/view?key=AIzaSyDMM7sP11oaiCkSJXhH6BjvotP9ZKHCyt0&center=${latitude},${longitude}&zoom=14`;

  return (
    <iframe
      src={mapSrc}
      width="100%"
      height={350}
      style={{ border: 0, borderRadius:12, marginTop:12 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
