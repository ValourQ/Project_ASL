import {Hand,Languages,Accessibility,Rocket} from "lucide-react";
function Features() {
  return (
    <section className="features" id="features">

      <div className="section-heading">
        <h2>Built for inclusive communication</h2>

        <p>
          Tools that make sign language simple,
          accessible and meaningful.
        </p>
      </div>

      <div className="features-grid">

        <div className="feature-card">
          <Hand size={32}/>
          <h3>Sign Language Interpreter</h3>

          <p>
            Convert sign language gestures into
            clear and readable text.
          </p>
        </div>

        <div className="feature-card">
          <Languages size={32}/>
          <h3>Sign Language Generator</h3>

          <p>
            Turn text into sign language
            representations easily.
          </p>
        </div>

        <div className="feature-card">
          <Accessibility size={32}/>
          <h3>Simple and Accessible</h3>

          <p>
            Designed with accessibility and
            usability in mind.
          </p>
        </div>

        <div className="feature-card">
          <Rocket size={32}/>
          <h3>Future Ready</h3>

          <p>
            Built to support future improvements
            and AI features.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Features;