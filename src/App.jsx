import { useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";
import useApod from "./hooks/useApod";
import "./index.css";

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, error, fetchApodByDate } = useApod(selectedDate);

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSidebarOpen(false);
    fetchApodByDate(date);
  };

  return (
    <div className="App">
      <Main data={data} selectedDate={selectedDate} error={error} />
      <SideBar
        show={sidebarOpen}
        data={data}
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        handleToggleModal={handleToggleSidebar}
      />
      {data && <Footer data={data} handleToggleModal={handleToggleSidebar} />}
    </div>
  );
}
