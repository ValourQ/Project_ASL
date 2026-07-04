import {Camera,Brain,MessageSquare} from "lucide-react";
function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">

      <div className="section-heading">
        <h2>How it works</h2>
        <p>
          A simple, three-step flow from input to communication.
        </p>
      </div>

      <div className="steps-grid">

        <div className="step-card">
          <Camera size={32}/>
          <h3>Capture</h3>

          <p>
            Capture gesture input through camera or enter text.
          </p>
        </div>

        <div className="step-card">
          <Brain size={32}/>
          <h3>Interpret</h3>
          <p>
            Interpret or generate the corresponding sign language.
          </p>
        </div>

        <div className="step-card">
          <MessageSquare size={32}/>
          <h3>Communicate</h3>
          <p>
            Display readable text or visual signs as output.
          </p>
        </div>

      </div>

    </section>
  );
}

export default HowItWorks;