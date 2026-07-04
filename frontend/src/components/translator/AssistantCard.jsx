import { useState } from "react";
import {
    Bot,
    Sparkles,
    X
} from "lucide-react";

import styles from "../../styles/translator/AssistantCard.module.css";

function AssistantCard({ sourceMode }) {

    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const isSign = sourceMode === "sign";

    return (

        <div className={styles.card}>

            {/* Left */}

            <div className={styles.left}>

                <div className={styles.icon}>

                    <Bot size={24}/>

                </div>

                <div className={styles.content}>

                    <div className={styles.topRow}>

                        <h3>

                            AI Assistant

                        </h3>
                    </div>

                    <p>

                        {

                            isSign

                            ?

                            "Use your webcam or upload media to translate sign language into text."

                            :

                            "Type your sentence to generate animated sign language gestures."

                        }

                    </p>

                </div>

            </div>

            {/* Right */}

            <div className={styles.rightSection}>

                <span className={styles.status}>
                    <Sparkles size={14}/>
                    Ready
                </span>

                <button
                    className={styles.closeButton}
                    onClick={() => setVisible(false)}
                    aria-label="Dismiss Assistant"
                >
                    <X size={18}/>
                </button>
           </div>
           
        </div>

    );

}

export default AssistantCard;