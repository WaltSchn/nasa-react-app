import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Loader from "./Loader";

export default function Main({ data, selectedDate, error }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setImgLoaded(false);
  }, [selectedDate]);

  if (!data) return null;

  const yy = selectedDate.getFullYear().toString().slice(-2);
  const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
  const dd = String(selectedDate.getDate()).padStart(2, "0");
  const apodUrl = `https://apod.nasa.gov/apod/ap${yy}${mm}${dd}.html`;

  const cannotRender =
    data.media_type !== "image" && data.media_type !== "video";

  return (
    <div className="imgContainer">
      {/* Fundo borrado */}
      {data.media_type === "image" && (
        <img
          src={data.hdurl || data.url}
          alt="blur background"
          className="bgImageBackground"
          aria-hidden="true"
        />
      )}

      {/* Loader centralizado */}
      {!imgLoaded && data.media_type === "image" && (
        <div className="loaderWrapper">
          <Loader />
        </div>
      )}

      {/* Imagem principal */}
      {data.media_type === "image" && (
        <img
          src={data.hdurl || data.url}
          alt={data.title || "NASA image"}
          className={`bgImage ${imgLoaded ? "loaded" : "loading"}`}
          onLoad={(e) => {
            e.currentTarget
              .decode()
              .then(() => setTimeout(() => setImgLoaded(true), 300))
              .catch(() => setImgLoaded(true));
          }}
          onError={() => setImgLoaded(true)}
        />
      )}

      {/* Vídeo */}
      {data.media_type === "video" && (
        <div className="videoContainer">
          <iframe
            title={data.title || "NASA Video"}
            src={data.url}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Error se não renderiza */}
      {cannotRender && (
        <div className="errorBox">
          <p>NASA sent a media type we can’t display</p>
          <a href={apodUrl} target="_blank" rel="noopener noreferrer">
            Click to view directly in the NASA APOD website
          </a>
        </div>
      )}

      {/* Error da API */}
      {error && (
        <div className="errorBox">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

Main.propTypes = {
  data: PropTypes.object.isRequired,
  error: PropTypes.string,
  selectedDate: PropTypes.instanceOf(Date),
};
