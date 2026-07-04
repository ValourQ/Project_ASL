import {Search,Bell,Moon,UserCircle,Menu} from "lucide-react";
import "../../styles/Topbar.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function Topbar({ collapsed, setCollapsed }){
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="topbar">

      <div className="topbar-left">

            <Menu
               size={24}
               className="menu-icon"
               onClick={() => setCollapsed(!collapsed)}/>

            <div className="search-box">

                 <Search size={18}/>

                    <input
                       type="text"
                        placeholder="Search anything..."/>

            </div>

      </div>
      <div className="topbar-right">

           <Bell size={20}/>

           <Moon
              className={`theme-icon ${theme === "dark" ? "active-moon" : ""}`}
              size={22}
              onClick={toggleTheme}
            />
           <div className="profile">
               <UserCircle size={38} id="user-icon"/>
                <span>Hello Alex!</span>
            </div>
        </div>

    </div>
  );
}

export default Topbar;