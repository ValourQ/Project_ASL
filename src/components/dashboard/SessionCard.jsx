import {
CalendarDays,
Clock3,
MoreVertical
} from "lucide-react";

function SessionCard({
icon,
title,
date,
duration,
accuracy,
color
}) {
return ( 

    <div className="session-item">
       <div className="session-left">

            <div className={`session-icon ${color}`}>
            {icon}
            </div>

            <div className="session-info">

            <h4>{title}</h4>

            <div className="session-meta">

                <CalendarDays size={14} />
                <span>{date}</span>

                <Clock3 size={14} />
                <span>{duration}</span>

            </div>

            </div>

        </div>

        <div className="session-right">

            <div className="accuracy-badge">
            {accuracy}
            </div>

            <MoreVertical size={18} />

        </div>

    </div>


);
}

export default SessionCard;
