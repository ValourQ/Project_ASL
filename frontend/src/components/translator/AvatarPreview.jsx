import {

    Hand,

    Circle,

    RotateCcw,

    Pause,

    Download,

    Trash2,

    Sparkles

} from "lucide-react";

import styles from "../../styles/translator/AvatarPreview.module.css";

function AvatarPreview({

    generated = false,

    animationName = "",

    status = "Waiting for input"

}) {

    return (

        <div className={styles.card}>

            {/* ================= HEADER ================= */}

            <div className={styles.header}>

                <div className={styles.headerLeft}>

                    <div className={styles.iconBox}>

                        <Hand size={28}/>

                    </div>

                    <div>

                        <h2>

                            Sign Output

                        </h2>

                        <p>

                            View generated sign language animation

                        </p>

                    </div>

                </div>

                <div className={styles.statusBadge}>

                    <Circle
                        size={8}
                        fill="currentColor"
                    />

                    Ready

                </div>

            </div>

            {/* ================= PREVIEW ================= */}

            <div className={styles.previewContainer}>

                {

                    generated

                    ?

                    <div className={styles.avatarPlaceholder}>

                        {/* Future Avatar / Video / Lottie */}

                        <Hand size={90}/>

                    </div>

                    :

                    <div className={styles.emptyState}>

                        <Sparkles size={70}/>

                        <h3>

                            No Animation Generated

                        </h3>

                        <p>

                            Enter some text and press
                            <strong> Generate Sign Animation </strong>
                            to preview the translation.

                        </p>

                    </div>

                }

            </div>

            {/* ================= DETAILS ================= */}

            <div className={styles.infoSection}>

                <div className={styles.infoRow}>

                    <span>

                        Status

                    </span>

                    <strong>

                        {status}

                    </strong>

                </div>

                <div className={styles.infoRow}>

                    <span>

                        Animation

                    </span>

                    <strong>

                        {

                            animationName ||

                            "None"

                        }

                    </strong>

                </div>

            </div>

            {/* ================= CONTROLS ================= */}

            <div className={styles.actions}>

                <button>

                    <RotateCcw size={18}/>

                    Replay

                </button>

                <button>

                    <Pause size={18}/>

                    Pause

                </button>

                <button>

                    <Download size={18}/>

                    Download

                </button>

                <button
                    className={styles.clearButton}
                >

                    <Trash2 size={18}/>

                    Clear

                </button>

            </div>

        </div>

    );

}

export default AvatarPreview;