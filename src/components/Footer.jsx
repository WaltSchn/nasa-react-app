import PropTypes from "prop-types";

export default function Footer({ data, handleToggleModal }) {
  return (
    <footer>
      <div>
        <h2>{data?.title}</h2>
        <h1>APOD Project</h1>
      </div>
      <button onClick={handleToggleModal} className="infoButton">
        <i className="fa-solid fa-circle-info"></i>
      </button>
    </footer>
  );
}

Footer.propTypes = {
  data: PropTypes.object,
  handleToggleModal: PropTypes.func.isRequired,
};
