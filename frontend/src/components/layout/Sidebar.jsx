import {
    LayoutDashboard,
    Hand,
    Type,
    BookmarkCheck,
    GraduationCap,
    History,
    Settings
} from "lucide-react";

import { NavLink } from "react-router-dom";

import logo from "../../assets/signsync-logo.png";
import "../../styles/Sidebar.css";

function Sidebar({ collapsed }) {

    return (

        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

            <div className="logo-section">

                <img
                    src={logo}
                    alt="SignSync Logo"
                    className="logo"
                />

                <h2>SignSync</h2>

            </div>

            <nav className="nav-menu">

                {/* Dashboard */}

                <NavLink
                    to="/dashboard"
                    className="nav-link"
                    title="Dashboard"
                >
                    <LayoutDashboard size={20}/>
                    <span>Dashboard</span>
                </NavLink>

                {/* Sign → Text */}

                              <NavLink
                  to="/translator/sign"
                  className="nav-link"
                  title="Sign → Text"
              >
                  <Hand size={20}/>
                  <span>Sign → Text</span>
              </NavLink>
              
              {/* Text → Sign */}
              <NavLink
                  to="/translator/text"
                  className="nav-link"
                  title="Text → Sign"
              >
                  <Type size={20}/>
                  <span>Text → Sign</span>
              </NavLink>

                {/* Saved */}

                <NavLink
                    to="/saved"
                    className="nav-link"
                    title="Saved"
                >
                    <BookmarkCheck size={20}/>
                    <span>Saved</span>
                </NavLink>

                {/* Practice */}

                <NavLink
                    to="/practice"
                    className="nav-link"
                    title="Practice Mode"
                >
                    <GraduationCap size={20}/>
                    <span>Practice Mode</span>
                </NavLink>

                {/* History */}

                <NavLink
                    to="/history"
                    className="nav-link"
                    title="History"
                >
                    <History size={20}/>
                    <span>History</span>
                </NavLink>

                {/* Settings */}

                <NavLink
                    to="/settings"
                    className="nav-link"
                    title="Settings"
                >
                    <Settings size={20}/>
                    <span>Settings</span>
                </NavLink>

            </nav>

        </aside>

    );

}

export default Sidebar;