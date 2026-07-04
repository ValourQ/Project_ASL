import { useNavigate } from "react-router-dom";

function Hero() {

  const navigate = useNavigate();



  

  return (
    <section className="hero">

      <div className="hero-left">

        <p className="hero-tag">
          Accessible communication, reimagined
        </p>

        <h1 className="hero-heading">
             Making communication accessible for
             <span className="highlight"> everyone.</span>
        </h1>

        <p className="hero-description">
          Understand and use sign language in a simple and
          accessible way designed to help people communicate
          more easily.
        </p>

        <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate("/auth")}>
                Get Started
            </button>

         <button  className="secondary-btn"
                 onClick={() => document.getElementById("about")
                  .scrollIntoView({ behavior: "smooth" }) }>
                        Learn More
          </button>
        </div>

        <div className="hero-keywords">
          <span>Accessibility First</span>
          <span>User Friendly</span>
          <span>Future Ready</span>
        </div>

      </div>

      <div className="hero-right">

    <div className="coming-soon-card">

        <h3>Coming Soon</h3>

        <p>
            Sign language interpretation and generation
            features are currently in development.
        </p>

        <div className="card-status">
            Stay tuned for exciting updates!
        </div>

    </div>

</div>

    </section>
  );
}

export default Hero;