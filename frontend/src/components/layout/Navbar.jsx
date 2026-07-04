import logo from "../../assets/signsync-logo.png";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">

      <div className="logo">
        <img src={logo} alt="SignSync logo" />
        <h1>SignSync</h1>
      </div>
      
     <ul className="nav-links">
        <li>
            <a href="#features">
                Features
            </a>
        </li>

        <li> 
            <a href="#how-it-works">
                How it works
            </a>
        </li>

        <li>
            <a href="#about">
                About
            </a>
        </li>
     </ul>
      

      <button className="get-started-btn"   onClick={() => navigate("/auth")}>
        Get Started
      </button>

    </nav>
  );
}

export default Navbar;