<<<<<<< HEAD
import React from 'react'

export default function Main(props) {
  const { data } = props
  return (
    <div className='imgContainer'>
        <img src={data.hdurl} alt={data.title || 'NASA image'}  className='bgImage' />
    </div>
  )
=======
import React from "react";

export default function Main({ data }) {
  const today = new Date().toISOString().slice(0, 10);
  const isBackup = data.date !== today; // se a data não for hoje
  const apodUrl = `https://apod.nasa.gov/apod/ap${data.date.replaceAll("-", "")}.html`;

  return (
    <div className="imgContainer" style={{ position: "relative" }}>
      {data.media_type === "image" ? (
        <img
          src={data.hdurl || data.url}
          alt={data.title || "NASA image"}
          className="bgImage"
        />
      ) : (
        <div className="fallbackBox">
          <p>No image available today</p>
        </div>
      )}

      {isBackup && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "rgba(255, 80, 80, 0.9)", // vermelho alerta
            padding: "0.5rem 0.8rem",
            borderRadius: "8px",
            fontSize: "0.9rem",
            textAlign: "center",
            color: "#fff",
            fontWeight: "600",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          <p style={{ margin: 0 }}>⚠️ APOD of the day is not an image</p>
          <p style={{ margin: "0.2rem 0 0 0", fontSize: "0.8rem" }}>
            Showing example from <strong>{data.date}</strong>
          </p>
          <a
            href={apodUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.8rem",
              color: "#fff",
              textDecoration: "underline",
              display: "block",
              marginTop: "0.2rem",
            }}
          >
            View today's APOD on NASA site
          </a>
        </div>
      )}
    </div>
  );
>>>>>>> 099cdf8 (Fallback for other types of media)
}
