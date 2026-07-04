import Sidebar from "./Sidebar";
import "../../styles/AppLayout.css";
import Topbar from "./Topbar";
import { useState,useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function AppLayout({ children }) {

  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="app-layout">

      <Sidebar collapsed={collapsed} />

      <main className="main-content">
        <Topbar
        collapsed={collapsed}
        setCollapsed={setCollapsed}/>
        {children}
      </main>

    </div>
  );
}

export default AppLayout;