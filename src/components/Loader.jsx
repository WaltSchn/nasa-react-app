import PropTypes from "prop-types";

export default function Loader() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#e6adf4ff",
        fontSize: "3rem",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <i className="fas fa-circle-notch fa-spin"></i>
    </div>
  );
}

Loader.propTypes = {
  text: PropTypes.string,
};
