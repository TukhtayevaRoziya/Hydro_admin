import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import SideBar from "./components/sidebar/SideBar";
import Content from "./components/content/Content";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./redux/store";

function App() {
  const [sidebarIsOpen, setSidebarOpen] = useState(
    window.innerWidth > 601 ? true : false
  );
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  useEffect(() => {
    window.addEventListener("storage", () => {
      if (!localStorage.accessToken) {
        store.dispatch({ type: "LOGOUT" });
      }
    });
  }, []);
  return (
    <div className="App">
      <SideBar
        toggle={toggleSidebar}
        isOpen={sidebarIsOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <Content
        toggleSidebar={toggleSidebar}
        sidebarIsOpen={sidebarIsOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
