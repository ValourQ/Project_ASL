import { ArrowRight } from "lucide-react";

function QuickActionCard({

    icon,

    title,

    description,

    onClick

}) {

    return (

        <div className="quick-action-card">

            <div className="card-icon">

                {icon}

            </div>

            <h2>

                {title}

            </h2>

            <p>

                {description}

            </p>

            <button
                className="start-btn"
                onClick={onClick}
            >

                Start

                <ArrowRight size={18}/>

            </button>

        </div>

    );

}

export default QuickActionCard;