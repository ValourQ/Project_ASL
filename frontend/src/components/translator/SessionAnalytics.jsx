import {
    Target,
    Zap,
    Timer,
    Hand,
    Activity,
    ActivitySquare
} from "lucide-react";

import styles from "../../styles/translator/SessionAnalytics.module.css";

function SessionAnalytics({

    accuracy,
    latency,
    sessionTime,
    signsDetected

}) {

    const stats = [

        {
            icon:<Target size={22}/>,
            title:"Accuracy",
            value:`${accuracy}%`,
            subtitle:"Excellent"
        },

        {
            icon:<Zap size={22}/>,
            title:"Latency",
            value:`${latency} ms`,
            subtitle:"Realtime"
        },

        {
            icon:<Timer size={22}/>,
            title:"Session Time",
            value:sessionTime,
            subtitle:"Running"
        },

        {
            icon:<Hand size={22}/>,
            title:"Signs Detected",
            value:signsDetected,
            subtitle:"Detected"
        }

    ];

    return (

        <div className={styles.card}>

            {/* ================= HEADER ================= */}

                <div className={styles.header}>

                    <div className={styles.headerInfo}>

                        <div className={styles.iconBox}>
                            <ActivitySquare size={28}/>
                        </div>

                        <div className={styles.titleGroup}>

                            <h3>
                                Session Analytics
                            </h3>

                            <p>
                                Today's translation performance
                            </p>

                        </div>

                    </div>

                    <div className={styles.liveBadge}>

                        <span className={styles.liveDot}></span>

                        Live

                    </div>

            </div>

            

            {/* ================= STATS ================= */}

            <div className={styles.grid}>

                {

                    stats.map((item,index)=>(

                        <div

                            key={index}

                            className={styles.statCard}

                        >

                            <div className={styles.icon}>

                                {item.icon}

                            </div>

                            <span className={styles.title}>

                                {item.title}

                            </span>

                            <h2>

                                {item.value}

                            </h2>

                            <small>

                                {item.subtitle}

                            </small>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default SessionAnalytics;