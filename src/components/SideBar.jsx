import PropTypes from "prop-types";
import { formatDate } from "../utils/formatDate";
import Calendar from "react-calendar"; 
import 'react-calendar/dist/Calendar.css';

export default function SideBar({ data, show, handleToggleModal, selectedDate, onDateChange }) {
  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("sidebarOverlay")) handleToggleModal();
  };

  return (
    <div className="sidebarOverlay" onClick={handleOverlayClick}>
      <div className="sidebarContents">
        <button onClick={handleToggleModal} className="closeButton">×</button>
        <h2>{data?.title}</h2>
        <p className="date">{formatDate(selectedDate)}</p>
        <p className="explanation">{data?.explanation}</p>

        <div className="calendarContainer">
          <Calendar
            value={selectedDate}
            onChange={onDateChange}
            maxDate={new Date()}
            locale="en-US"
            tileClassName={({ date, view }) => {
              if (view === "month") {
                if (date.toDateString() === new Date().toDateString()) return "tile-today";
                if (date > new Date()) return "tile-future";
                return "tile-past";
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  data: PropTypes.object,
  show: PropTypes.bool.isRequired,
  handleToggleModal: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func,
};
