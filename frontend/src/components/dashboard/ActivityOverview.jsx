import { useState } from "react";
import {
CalendarDays,
Clock3,
Hand,
Bookmark,
ChevronDown
} from "lucide-react";

import DashboardCard from "./DashboardCard";

function ActivityOverview() {

const [period, setPeriod] = useState("This Week");
const [showDropdown, setShowDropdown] = useState(false);

return ( 

  <div className="activity-overview card">
        <div className="card-header">

            <h2>Activity Overview</h2>

            <div className="week-dropdown">

            <button
                className="week-btn"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                {period}
                <ChevronDown size={18} />
            </button>

            {showDropdown && (

                <div className="dropdown-menu">

                <div
                    onClick={() => {
                    setPeriod("Today");
                    setShowDropdown(false);
                    }}
                >
                    Today
                </div>

                <div
                    onClick={() => {
                    setPeriod("This Week");
                    setShowDropdown(false);
                    }}
                >
                    This Week
                </div>

                <div
                    onClick={() => {
                    setPeriod("This Month");
                    setShowDropdown(false);
                    }}
                >
                    This Month
                </div>

                <div
                    onClick={() => {
                    setPeriod("This Year");
                    setShowDropdown(false);
                    }}
                >
                    This Year
                </div>

                </div>

            )}

            </div>

        </div>

        <div className="activity-grid">

            <DashboardCard
            icon={<CalendarDays size={28} />}
            value="128"
            label="Total Sessions"
            color="purple"
            />

            <DashboardCard
            icon={<Clock3 size={28} />}
            value="5h 42m"
            label="Total Usage"
            color="blue"
            />

            <DashboardCard
            icon={<Hand size={28} />}
            value="24,361"
            label="Signs Interpreted"
            color="orange"
            />

            <DashboardCard
            icon={<Bookmark size={28} />}
            value="56"
            label="Saved Sessions"
            color="light-purple"
            />

        </div>

    </div>
);
}

export default ActivityOverview;
