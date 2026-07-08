import AppLayout from "../components/layout/AppLayout";
import "../styles/Dashboard.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {Hand,Type,BookmarkCheck,GraduationCap,MessageCircle,Sparkles} from "lucide-react";
import QuickActionCard from "../components/dashboard/QuickActionCard";
import SessionCard from "../components/dashboard/SessionCard";
import ActivityOverview from "../components/dashboard/ActivityOverview";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
return (


<AppLayout>

  <div className="dashboard">

    <div className="welcome-section">

      <h1>
        Welcome back

        <span className="sparkle-wrapper">
          <Sparkles size={28} />
        </span>

      </h1>

      <p>
        Let's continue your ASL journey.
      </p>

    </div>

    <div className="quick-actions">

          <QuickActionCard
        icon={<Hand size={34}/>}
        title="Sign → Text"
        description="Convert sign language to text in real-time."
        onClick={() => navigate("/translator/sign")}
    />

    <QuickActionCard
        icon={<Type size={34}/>}
        title="Text → Sign"
        description="Convert text into sign language."
        onClick={() => navigate("/translator/text")}
    />

    <QuickActionCard
        icon={<BookmarkCheck size={34}/>}
        title="Saved"
        description="Access your saved translations and favorite sessions."
        onClick={() => navigate("/saved")}
    />

  </div>

    <div className="dashboard-bottom">

      <div className="recent-sessions card">

        <div className="card-header">

          <h2>
            Recent Sessions
          </h2>

          <button className="view-all">
            View all
          </button>

        </div>

        <SessionCard
          icon={<Hand size={20} />}
          title="Live Interpretation"
          date="Today, 10:30 AM"
          duration="2 min 45 sec"
          accuracy="96%"
          color="live"
        />

        <SessionCard
          icon={<MessageCircle size={20} />}
          title="Conversation"
          date="Yesterday, 4:15 PM"
          duration="8 min 15 sec"
          accuracy="97%"
          color="conversation"
        />

        <SessionCard
          icon={<GraduationCap size={20} />}
          title="Practice Session"
          date="May 24, 2025"
          duration="15 min 30 sec"
          accuracy="91%"
          color="practice"
        />

        <SessionCard
          icon={<Type size={20} />}
          title="Text → Sign"
          date="May 22, 2025"
          duration="3 min 12 sec"
          accuracy="94%"
          color="text-sign"
        />

      </div>

      <ActivityOverview />

    </div>

  </div>

</AppLayout>


);

}

export default Dashboard;
