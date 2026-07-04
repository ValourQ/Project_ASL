import {useNavigate} from "react-router-dom";
function CTA() {
    const navigate=useNavigate();
  return (
    <section className="cta">

    <div className="cta-content">

        <div className="cta-left">
            <h2>Ready to communicate?</h2>

            <p>
                Create your free account and start exploring SignSync.
            </p>
        </div>

        <div className="cta-right">
            <button className="cta-btn" onClick={() => navigate("/auth")}>
                Get Started
            </button>
        </div>

    </div>

</section>
  );
}

export default CTA;