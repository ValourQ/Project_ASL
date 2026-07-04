import React from "react";

function DashboardCard({ icon, value, label, color }) {
return ( 
    <div className="metric-card">
            <div className={`metric-icon ${color}`}>
            {icon}
            </div>
        <h2>{value}</h2>
        <p>{label}</p>
    </div>

);
}

export default DashboardCard;
