import {
    History,
    Clock3,
    Camera,
    Image,
    Video
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import styles from "../../styles/translator/RecentPredictions.module.css";

function RecentPredictions({ history = [] }) {

    const navigate = useNavigate();

    const getSourceIcon = (source) => {

        switch (source) {

            case "image":
                return <Image size={16} />;

            case "video":
                return <Video size={16} />;

            default:
                return <Camera size={16} />;

        }

    };

    const getSourceName = (source) => {

        switch (source) {

            case "image":
                return "Image";

            case "video":
                return "Video";

            default:
                return "Camera";

        }

    };

    return (

        <div className={styles.card}>

            {/* ================= Header ================= */}

            <div className={styles.header}>

                <div className={styles.headerTitle}>

                    <div className={styles.iconBox}>

                        <History size={24} />

                    </div>

                    <h3>

                        Recent Predictions

                    </h3>

                </div>

                <button
                    className={styles.viewAll}
                    onClick={() => navigate("/history")}
                >

                    View All →

                </button>

            </div>

            {/* ================= Empty State ================= */}

            {

                history.length === 0 ?

                    <div className={styles.empty}>

                        <History size={42} />

                        <h4>

                            No predictions yet!

                        </h4>

                        <p>

                            Your recent translations will appear here.

                        </p>

                    </div>

                    :

                    <div className={styles.list}>

                        {

                            history.map((item, index) => (

                                <div
                                    key={index}
                                    className={styles.item}
                                >

                                    {/* ================= Top Row ================= */}

                                    <div className={styles.itemTop}>

                                        <div className={styles.time}>

                                            <Clock3 size={14} />

                                            {item.time}

                                        </div>

                                        <span className={styles.accuracy}>

                                            Accuracy {item.accuracy}%

                                        </span>

                                    </div>

                                    {/* ================= Prediction ================= */}

                                    <h4>

                                        {item.sign}

                                    </h4>

                                    {/* ================= Bottom ================= */}

                                    <div className={styles.itemBottom}>

                                        <span className={styles.source}>

                                            {getSourceIcon(item.source)}

                                            {getSourceName(item.source)}

                                        </span>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

            }

        </div>

    );

}

export default RecentPredictions;