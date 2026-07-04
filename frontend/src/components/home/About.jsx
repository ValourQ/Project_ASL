import { HeartHandshake } from "lucide-react";
import logo from "../../assets/signsync-logo.png";

function About() {
  return (
    <section className="about" id="about">
        <div className="about-icon">
            <img src={logo} alt="SignSync Logo" />
        </div>
        <h2>About SignSync</h2>
        <p>
          SignSync is designed to make communication easier through
          sign language.
          It helps connecting sign language users with the hearing community.
          Our goal is to create simple and accessible tools that
          support inclusive communication for everyone.
        </p>
        <div className="love-container">
            <span>Made with Love and Care</span>
            <HeartHandshake size={30}/>
        </div>
    </section>
  );
}

export default About;