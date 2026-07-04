import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function QuickActionCard({
  icon,
  title,
  description,
  route
}) {

  const navigate = useNavigate();

  return (
    <div className="quick-action-card">

      <div className="card-icon">
        {icon}
      </div>

      <h2>{title}</h2>

      <p>{description}</p>

      <button
        className="start-btn"
        onClick={() => navigate(route)}
      >
        Start
        <ArrowRight size={18}/>
      </button>

    </div>
  );
}

export default QuickActionCard;